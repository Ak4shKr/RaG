import { QdrantClient } from '@qdrant/js-client-rest';
import { env } from '../../config/env';

const client = new QdrantClient({
  url: env.qdrantUrl,
  apiKey: env.qdrantApiKey
});

export { client };
