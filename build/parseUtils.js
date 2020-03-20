const extractImportPaths = fileContent => {
  let remainingFile = fileContent;
  const paths = [];
  while (remainingFile.includes('include(')) {
    const importStartIndex = remainingFile.indexOf('include(') + 9;
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
