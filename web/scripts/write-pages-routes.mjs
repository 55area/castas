import { copyFile, mkdir } from 'node:fs/promises';
import { URL } from 'node:url';

// GitHub Pages serves static files. Give each BrowserRouter route an entry page.
const output = new URL('../dist/', import.meta.url);
const index = new URL('index.html', output);
const routes = ['test', 'result', 'about', 'political-fanatic', 'terms-of-use', 'privacy-policy'];

for (const route of routes) {
  const directory = new URL(`${route}/`, output);
  await mkdir(directory, { recursive: true });
  await copyFile(index, new URL('index.html', directory));
}
