import { indexMarkdownFile } from './index-docs';
import { askWithRag } from './rag-chat';

async function main() {
  await indexMarkdownFile('src/data/docs.md');

  const answer = await askWithRag(
    'How long does a password reset link last in AcmePay?'
  );

  console.log('\nRAG answer:\n', answer);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
