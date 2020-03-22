const {
  readContentFromFile,
  writeContentToFile,
} = require('../build/fileUtils');
const { extractImportPaths } = require('../build/parseUtils');
const { getOrderedListOfFiles } = require('../build/sortUtils');

const run = pathOfFileToRun => {
  let importedFilePaths = {};
  let importQueue = [pathOfFileToRun];

  let output = `
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
    paths.forEach(path => {
      if (!importedFilePaths[path]) {
        importQueue.push(path);
      }
    });
  }
  const topologicallyOrderedFiles = getOrderedListOfFiles(importedFilePaths);
  topologicallyOrderedFiles.forEach(({ path, content }) => {
    output +=
      path === pathOfFileToRun
        ? `
${content}
`
        : `
modules['${path}'] = (() => {
  const module = { exports: {} };
  ${content}
  return module.exports;
})();
`;
  });

  return eval(output);
};

module.exports = { run };
