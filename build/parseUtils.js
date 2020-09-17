const trim = (string) => {
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

const extractImportPaths = (fileContent) => {
  let remainingFile = fileContent;
  const paths = [];
  while (remainingFile.includes('require(')) {
    const importStartIndex = remainingFile.indexOf('require(') + 9;
    remainingFile = remainingFile.slice(importStartIndex);
    const importEndIndex = remainingFile.indexOf(')') - 1;
    const path = trim(remainingFile.slice(0, importEndIndex));
    remainingFile = remainingFile.slice(importEndIndex);
    paths.push(path);
  }
  return paths;
};

const getNewAbsolutePath = (absolutePath, relativePath) => {
  // Remove dots representing current folder.
  // Remove file from path, if it is included in the path
  const absolutePathFolder = absolutePath
    .split('/')
    .filter((folderOrFile) => !folderOrFile.includes('.js'))
    .join('/');

  const uncleanAbsolutePath = `./${absolutePathFolder}/${relativePath}`;
  // Remove any steps back to parent directory if possible
  const cleanedAbsolutePath = uncleanAbsolutePath
    .split('/')
    .filter((folderOrFile) => folderOrFile !== '.')
    .reduce((currentFoldersOrFiles, folderOrFile) => {
      const lastCurrentFolderOrFile =
        currentFoldersOrFiles[currentFoldersOrFiles.length - 1];
      if (
        folderOrFile === '..' &&
        lastCurrentFolderOrFile &&
        lastCurrentFolderOrFile !== '..'
      ) {
        return currentFoldersOrFiles.slice(0, -1);
      }
      return [...currentFoldersOrFiles, folderOrFile];
    }, [])
    .join('/');
  return cleanedAbsolutePath;
};

module.exports = {
  extractImportPaths,
  getNewAbsolutePath,
};
