import { model } from '../../llm/model';

export async function chat(message: string) {
  const response = await model.invoke(message);

  return response.content;
}
