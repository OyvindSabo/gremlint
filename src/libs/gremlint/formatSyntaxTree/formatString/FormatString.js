const formatString = (config) => (syntaxTree) => {
  return {
    type: 'string',
    string: syntaxTree.string,
    indentation: config.indentation,
  };
};

module.exports = { formatString };
