import { runAgent } from "./src/features/chat/agent";

async function main() {
  const response = await runAgent(
    "What is 12 + 75, what is the current time in Nepal right now, and how many characters are in 'agentic AI uses tools' & how are you able to answer such question?",
  );

  console.log("\nFinal answer:\n", response);
}

main();
