const { readContentFromFile, writeContentToFile } = require('./fileUtils');
const { extractImportPaths } = require('./parseUtils');
const { getOrderedListOfFiles } = require('./sortUtils');

const build = () => {
  let importedFilePaths = {};
  let importQueue = ['src/index.js'];

  let output = `
<!DOCTYPE html>
<html lang="en-US">
<head>
<meta name="google-site-verification" content="8rkkiQkZaBwVUAUBxSY6Nj_EBHqCGPEYnEJmlyXuLnw" />
<script>
const modules = {}
const include = path => modules[path];
`;

  while (importQueue.length) {
    const path = importQueue.shift();
    const fileContent = readContentFromFile(path);
    const paths = extractImportPaths(fileContent);
    importedFilePaths[path] = {
      content: fileContent,
      dependencies: paths,
    };
    paths.forEach((path) => {
      if (!importedFilePaths[path]) {
        importQueue.push(path);
      }
    });
  }
  const topologicallyOrderedFiles = getOrderedListOfFiles(importedFilePaths);
  topologicallyOrderedFiles.forEach(({ path, content }) => {
    output +=
      path === 'src/index.js'
        ? `
window.addEventListener('load', () => {
${content}
})
`
        : `
modules['${path}'] = (() => {
  const module = { exports: {} };
  ${content}
  return module.exports;
})();
`;
  });

  output += '</script></head><body></body></html>';

  writeContentToFile(output, 'dist/index.html');
};

module.exports = { build };
