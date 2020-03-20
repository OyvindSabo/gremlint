const { readContentFromFile, writeContentToFile } = require('./fileUtils');
const { extractImportPaths } = require('./parseUtils');
const { getOrderedListOfFiles } = require('./sortUtils');

let importedFilePaths = {};
let importQueue = ['src/index.js'];

let output = `
<script>
const dependencyHell = {}
const createDependencyHell = path => dependencyHell[path];
`;

while (importQueue.length) {
  const path = importQueue.shift();
  const fileContent = readContentFromFile(path);
  const paths = extractImportPaths(fileContent);
  importedFilePaths[path] = {
    content: fileContent,
    dependencies: paths,
  };
  paths.forEach(path => {
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
dependencyHell['${path}'] = (() => {
${content}
})();
`;
});

output += '</script>';

writeContentToFile(output, 'dist/index.html');
