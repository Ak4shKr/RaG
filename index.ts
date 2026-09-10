import { askWithRag } from './src/features/rag/rag-chat';

async function main() {
  const response = await askWithRag(
    'What happens if I enter the wrong password for 4 times, what happen then and how to secure ourselves from gettting blocked?'
  );

  console.log('\nFinal answer:\n', response);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
