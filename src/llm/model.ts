import { ChatGroq } from '@langchain/groq';
import { env } from '../config/env';

export const model = new ChatGroq({
  apiKey: env.groqApiKey,
  model: 'openai/gpt-oss-120b',
  temperature: 0.2
});
