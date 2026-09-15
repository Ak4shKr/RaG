import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { embedText } from '../../embeddings/gemini-embeddings';
import { model } from '../../llm/model';
import { client } from '../assistant/qdrant';
import { RAG_COLLECTION_NAME, RAG_TOP_K } from './config';

export type ChatTurn = {
  role: 'user' | 'assistant';
  content: string;
};

type RetrievedChunkPayload = {
  source?: string;
  chunkIndex?: number;
  text?: string;
};

function formatContext(chunks: RetrievedChunkPayload[]) {
  return chunks
    .map((chunk, index) => {
      return `Source ${index + 1}: ${chunk.source ?? 'unknown'}#chunk-${chunk.chunkIndex ?? '?'}\n${chunk.text ?? ''}`;
    })
    .join('\n\n---\n\n');
}

function formatHistory(history: ChatTurn[]) {
  if (!history.length) {
    return 'No previous conversation.';
  }

  return history
    .slice(-8)
    .map((turn) => `${turn.role.toUpperCase()}: ${turn.content}`)
    .join('\n');
}

function isShortClarification(question: string) {
  return question.trim().split(/\s+/).length <= 5;
}

function lastAssistantAskedForClarification(history: ChatTurn[]) {
  const lastAssistantTurn = history.findLast(
    (turn) => turn.role === 'assistant'
  );

  if (!lastAssistantTurn) {
    return false;
  }

  return /clarify|which|do you mean|interested in/i.test(
    lastAssistantTurn.content
  );
}

function getLastUserQuestion(history: ChatTurn[]) {
  return history.findLast((turn) => turn.role === 'user')?.content;
}

function isShortCompanyQuestion(question: string) {
  return (
    question.trim().split(/\s+/).length <= 8 &&
    /company|name|data|document|docs|vector|database|qdrant/i.test(question)
  );
}

function buildRetrievalQuery(question: string, history: ChatTurn[]) {
  if (
    history.length &&
    isShortClarification(question) &&
    lastAssistantAskedForClarification(history)
  ) {
    const previousQuestion = getLastUserQuestion(history);

    return previousQuestion
      ? `${previousQuestion}\nClarification: ${question}`
      : question;
  }

  if (isShortCompanyQuestion(question)) {
    return `${question}\nAcmePay company overview internal customer policy manual online payment platform`;
  }

  return question;
}

export async function retrieveContext(question: string) {
  const queryVector = await embedText(question);

  const results = await client.query(RAG_COLLECTION_NAME, {
    query: queryVector,
    limit: RAG_TOP_K,
    with_payload: true
  });

  return results.points.map(
    (result) => result.payload as RetrievedChunkPayload
  );
}

export async function askWithRag(question: string, history: ChatTurn[] = []) {
  const retrievalQuery = buildRetrievalQuery(question, history);
  const chunks = await retrieveContext(retrievalQuery);
  const context = formatContext(chunks);
  const conversation = formatHistory(history);

  const response = await model.invoke([
    new SystemMessage(
      `You are a human-in-the-loop RAG assistant connected to a Qdrant vector database.
      The vector database contains chunks from an AcmePay policy document. You receive relevant retrieved chunks in the Retrieved context section for each user message.
      You do not have the entire vector database loaded in memory at once, but you can answer from the chunks retrieved for the current question.
      Answer using only the provided context and conversation for document-specific questions.
      If the user asks about the chat experience, formatting, your data source, Qdrant, vector database access, or how you respond, answer directly and accurately without requiring retrieved context.
      If the user asks a company-policy or document-specific question and the context does not contain the answer, say you do not know.
      If the user's policy question is ambiguous, or if multiple retrieved policies could apply, ask one short clarification question before giving a final answer.
      If the previous assistant message asked a clarification question and the current user message clarifies it, answer the original question using that clarification.
      Ask for clarification especially when the user mentions broad terms like policy, approval, security, access, refund, money back, data, exception, or automatic handling without specifying the exact policy or audience.
      Keep responses concise, natural, and user-friendly.
      Use plain text only. Do not use Markdown formatting such as **bold**, bullet symbols, numbered lists, headings, tables, or code blocks.
      Do not include source names, chunk numbers, citations, or file paths in the final answer.`
    ),
    new HumanMessage(
      `Conversation so far:\n${conversation}\n\nRetrieved context:\n${context}\n\nCurrent user message: ${question}`
    )
  ]);

  return String(response.content);
}
