import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { embedText } from '../../embeddings/gemini-embeddings';
import { model } from '../../llm/model';
import { client } from '../assistant/qdrant';
import { RAG_COLLECTION_NAME, RAG_TOP_K } from './config';

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

export async function askWithRag(question: string) {
  const chunks = await retrieveContext(question);
  const context = formatContext(chunks);

  const response = await model.invoke([
    new SystemMessage(
      `You are a RAG assistant. Answer using only the provided context.
      If the context does not contain the answer, say you do not know.
      Keep the answer concise, natural, and user-friendly.
      Do not include source names, chunk numbers, citations, or file paths in the final answer.`
    ),
    new HumanMessage(`Context:\n${context}\n\nQuestion: ${question}`)
  ]);

  return response.content;
}
