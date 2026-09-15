import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { askWithRag, type ChatTurn } from './src/features/rag/rag-chat';

async function main() {
  const rl = readline.createInterface({ input, output });
  const history: ChatTurn[] = [];

  console.log('Human-in-the-loop RAG chat started.');
  console.log('Ask a question about AcmePay policies. Type "exit" to quit.\n');

  while (true) {
    const userInput = await rl.question('You: ');
    const question = userInput.trim();

    if (!question) {
      continue;
    }

    if (['exit', 'quit', 'q'].includes(question.toLowerCase())) {
      console.log('Goodbye!');
      break;
    }

    try {
      const answer = await askWithRag(question, history);

      console.log(`\nAssistant: ${answer}\n`);

      history.push({ role: 'user', content: question });
      history.push({ role: 'assistant', content: answer });
    } catch (error) {
      console.error('\nAssistant error:', error);
      console.log('Please try again or type "exit" to quit.\n');
    }
  }

  rl.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
