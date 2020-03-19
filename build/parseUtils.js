const extractImportPaths = fileContent => {
  let remainingFile = fileContent;
  const paths = [];
  while (remainingFile.includes('createDependencyHell')) {
    const importStartIndex = remainingFile.indexOf('createDependencyHell') + 22;
    remainingFile = remainingFile.slice(importStartIndex);
    const importEndIndex = remainingFile.indexOf(')') - 1;
    const path = remainingFile.slice(0, importEndIndex);
    remainingFile = remainingFile.slice(importEndIndex);
    paths.push(path);
  }
  return paths;
};

module.exports = {
  extractImportPaths,
};
