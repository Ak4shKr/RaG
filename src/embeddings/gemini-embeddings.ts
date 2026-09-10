import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { env } from '../config/env';

export const EMBEDDING_MODEL = 'gemini-embedding-001';
export const EMBEDDING_DIMENSION = 3072;

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: env.googleApiKey,
  model: EMBEDDING_MODEL
});

function validateEmbedding(vector: number[], input: string) {
  if (!vector.length) {
    throw new Error(
      `Gemini returned an empty embedding for: "${input.slice(0, 80)}..."`
    );
  }

  if (vector.length !== EMBEDDING_DIMENSION) {
    throw new Error(
      `Expected ${EMBEDDING_DIMENSION} dimensions from ${EMBEDDING_MODEL}, but got ${vector.length}`
    );
  }

  return vector;
}

export async function embedText(text: string) {
  const vector = await embeddings.embedQuery(text);

  return validateEmbedding(vector, text);
}

export async function embedTexts(texts: string[]) {
  const vectors: number[][] = [];

  for (const text of texts) {
    const vector = await embedText(text);
    vectors.push(vector);
  }

  return vectors;
}
