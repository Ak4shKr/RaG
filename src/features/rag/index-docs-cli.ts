import { indexMarkdownFile } from './index-docs';

indexMarkdownFile('src/data/docs.md').catch((error) => {
  console.error(error);
  process.exit(1);
});
