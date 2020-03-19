/**
 * @param {{ content: string; dependencies: string[] }} importedFilePaths
 */
const getOrderedListOfFiles = importedFilePaths => {
  console.log('importedFilePaths: ', importedFilePaths);
  const orderedListOfFiles = [];
  const handledPaths = [];
  let remainingFiles = Object.entries(importedFilePaths).map(
    ([path, { content, dependencies }]) => ({
      path,
      content,
      dependencies,
    })
  );
  while (remainingFiles.length) {
    const firstFileWithoutDependencies = remainingFiles.find(
      ({ dependencies }, index) => !dependencies.length
    );
    orderedListOfFiles.push({
      path: firstFileWithoutDependencies.path,
      content: firstFileWithoutDependencies.content,
    });
    handledPaths.push(firstFileWithoutDependencies.path);
    remainingFiles = remainingFiles.filter(
      ({ path }) => path !== firstFileWithoutDependencies.path
    );
    remainingFiles.forEach(({ path, dependencies }, index) => {
      remainingFiles[index].dependencies = dependencies.filter(
        dependency => dependency !== firstFileWithoutDependencies.path
      );
    });
  }
  console.log('orderedListOfFiles: ', orderedListOfFiles);
  return orderedListOfFiles;
};

module.exports = {
  getOrderedListOfFiles,
};
