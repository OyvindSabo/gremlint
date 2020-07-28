const formatWord = (config) => (syntaxTree) => {
  return {
    type: 'word',
    word: syntaxTree.word,
    indentation: config.indentation,
    shouldStartWithDot: config.shouldStartWithDot,
    shouldEndWithDot: config.shouldEndWithDot,
  };
};

module.exports = { formatWord };
