const trim = string => {
  const withoutSpaces = string.trim();
  const withoutStartQuote = [`'`, '"', '`'].includes(withoutSpaces.charAt(0))
    ? withoutSpaces.slice(1)
    : withoutSpaces;
  const withoutEndQuote = [`'`, '"', '`'].includes(
    withoutStartQuote.charAt(withoutStartQuote.length - 1)
  )
    ? withoutStartQuote.slice(0, withoutStartQuote.length - 1)
    : withoutStartQuote;
  return withoutEndQuote;
};

const extractImportPaths = fileContent => {
  let remainingFile = fileContent;
  const paths = [];
  while (remainingFile.includes('include(')) {
    const importStartIndex = remainingFile.indexOf('include(') + 9;
    remainingFile = remainingFile.slice(importStartIndex);
    const importEndIndex = remainingFile.indexOf(')') - 1;
    const path = trim(remainingFile.slice(0, importEndIndex));
    remainingFile = remainingFile.slice(importEndIndex);
    paths.push(path);
  }
  return paths;
};

module.exports = {
  extractImportPaths,
};
