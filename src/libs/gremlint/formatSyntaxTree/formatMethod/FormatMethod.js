const { recreateQueryOnelinerFromSyntaxTree } = include(
  'src/libs/gremlint/recreateQueryOnelinerFromSyntaxTree/RecreateQueryOnelinerFromSyntaxTree.js'
);
const { withIncreasedIndentation, withZeroIndentation } = include(
  'src/libs/gremlint/formatSyntaxTree/utils.js'
);

// Groups arguments into argument groups an adds an indentation property
const formatMethod = (formatSyntaxTree) => (config) => (syntaxTree) => {
  const recreatedQuery = recreateQueryOnelinerFromSyntaxTree(
    config.indentation
  )(syntaxTree);
  if (recreatedQuery.length <= config.maxLineLength) {
    return {
      type: 'method',
      method: formatSyntaxTree(config)(syntaxTree.method),
      argumentGroups: [
        syntaxTree.arguments.map(formatSyntaxTree(withZeroIndentation(config))),
      ],
      argumentsShouldStartOnNewLine: false,
    };
  }
  return {
    type: 'method',
    method: formatSyntaxTree(config)(syntaxTree.method),
    argumentGroups: syntaxTree.arguments.map((step) => [
      formatSyntaxTree(withIncreasedIndentation(config, 2))(step),
    ]),
    argumentsShouldStartOnNewLine: true,
  };
};

module.exports = { formatMethod };
