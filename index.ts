import { askWithRag } from './src/features/rag/rag-chat';

async function main() {
  const response = await askWithRag(
    'What happen in case if my payment get deducted but no refund, any contact where I can get a call?'
  );

  console.log('\nFinal answer:\n', response);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
