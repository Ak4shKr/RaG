import 'dotenv/config';

const groqApiKey = process.env.GROQ_API_KEY;
const qdrantApiKey = process.env.QDRANT_API_KEY;
const qdrantUrl = process.env.QDRANT_CLUSTER_ENDPOINT;
const googleApiKey = process.env.GOOGLE_API_KEY;

if (!groqApiKey) {
  throw new Error('GROQ_API_KEY is missing');
}

if (!qdrantApiKey) {
  throw new Error('QDRANT_API_KEY is missing');
}

if (!qdrantUrl) {
  throw new Error('QDRANT_CLUSTER_ENDPOINT is missing');
}

if (!googleApiKey) {
  throw new Error('GOOGLE_API_KEY is missing');
}

export const env = {
  groqApiKey,
  qdrantApiKey,
  qdrantUrl,
  googleApiKey
};
