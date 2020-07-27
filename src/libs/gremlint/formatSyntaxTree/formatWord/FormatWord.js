const formatWord = (config) => (syntaxTree) => {
  return {
    type: 'word',
    word: syntaxTree.word,
    indentation: config.indentation,
  };
};

module.exports = { formatWord };
