import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { MarkdownTextSplitter } from '@langchain/textsplitters';
import {
  EMBEDDING_DIMENSION,
  embedTexts
} from '../../embeddings/gemini-embeddings';
import { client } from '../assistant/qdrant';
import {
  RAG_CHUNK_OVERLAP,
  RAG_CHUNK_SIZE,
  RAG_COLLECTION_NAME
} from './config';

type ChunkPayload = {
  source: string;
  chunkIndex: number;
  text: string;
};

function createPointId(source: string, chunkIndex: number, text: string) {
  const hash = createHash('sha256')
    .update(`${source}:${chunkIndex}:${text}`)
    .digest('hex');

  return [
    hash.slice(0, 8),
    hash.slice(8, 12),
    `4${hash.slice(13, 16)}`,
    `8${hash.slice(17, 20)}`,
    hash.slice(20, 32)
  ].join('-');
}

async function ensureCollection() {
  const collections = await client.getCollections();
  const exists = collections.collections.some(
    (collection) => collection.name === RAG_COLLECTION_NAME
  );

  if (exists) {
    return;
  }

  await client.createCollection(RAG_COLLECTION_NAME, {
    vectors: {
      size: EMBEDDING_DIMENSION,
      distance: 'Cosine'
    }
  });
}

export async function indexMarkdownFile(filePath = 'src/data/docs.md') {
  const absolutePath = resolve(filePath);
  const markdown = await readFile(absolutePath, 'utf8');

  const splitter = new MarkdownTextSplitter({
    chunkSize: RAG_CHUNK_SIZE,
    chunkOverlap: RAG_CHUNK_OVERLAP
  });

  const chunks = await splitter.splitText(markdown);
  const vectors = await embedTexts(chunks);

  if (vectors.some((vector) => vector.length === 0)) {
    throw new Error('One or more Gemini embeddings are empty');
  }

  await ensureCollection();

  await client.upsert(RAG_COLLECTION_NAME, {
    wait: true,
    points: chunks.map((chunk, index) => ({
      id: createPointId(filePath, index, chunk),
      vector: vectors[index],
      payload: {
        source: filePath,
        chunkIndex: index,
        text: chunk
      } satisfies ChunkPayload
    }))
  });

  console.log(
    `Indexed ${chunks.length} chunks from ${filePath} into ${RAG_COLLECTION_NAME}`
  );
}
