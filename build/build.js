const { readContentFromFile, writeContentToFile } = require('./fileUtils');
const { extractImportPaths, getNewAbsolutePath } = require('./parseUtils');
const { getOrderedListOfFiles } = require('./sortUtils');

const build = () => {
  let importedFilePaths = {};
  let importQueue = ['./src/index.js'];

  let output = `
<!DOCTYPE html>
<html lang="en-US">
<head>
<meta name="google-site-verification" content="8rkkiQkZaBwVUAUBxSY6Nj_EBHqCGPEYnEJmlyXuLnw" />
<script>
const modules = {}
const require = path => modules[path];
`;

  while (importQueue.length) {
    const absolutePath = importQueue.shift();
    const fileContent = readContentFromFile(absolutePath);
    const relativePaths = extractImportPaths(fileContent);
    const absolutePaths = relativePaths.map((relativePath) =>
      getNewAbsolutePath(absolutePath, relativePath)
    );
    const fileContentWithAbsolutePaths = relativePaths.reduce(
      (currentContent, relativePath, i) => {
        return currentContent.replace(relativePath, absolutePaths[i]);
      },
      fileContent
    );
    importedFilePaths[absolutePath] = {
      content: fileContentWithAbsolutePaths,
      dependencies: absolutePaths,
    };
    absolutePaths.forEach((absolutePath) => {
      if (!importedFilePaths[absolutePath]) {
        importQueue.push(absolutePath);
      }
    });
  }
  const topologicallyOrderedFiles = getOrderedListOfFiles(importedFilePaths);
  topologicallyOrderedFiles.forEach(({ path, content }) => {
    output +=
      path === './src/index.js'
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

  writeContentToFile(output, './dist/index.html');
};

module.exports = { build };
