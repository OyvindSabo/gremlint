const { pipe } = require('../../../simpleFP/SimpleFP.js');
const {
  recreateQueryOnelinerFromSyntaxTree,
} = require('../../recreateQueryOnelinerFromSyntaxTree/RecreateQueryOnelinerFromSyntaxTree.js');
const {
  withIncreasedIndentation,
  withZeroIndentation,
  withZeroDotInfo,
  withNoEndDotInfo,
} = require('../utils.js');

// Groups arguments into argument groups an adds an indentation property
const formatMethod = (formatSyntaxTree) => (config) => (syntaxTree) => {
  const recreatedQuery = recreateQueryOnelinerFromSyntaxTree(
    config.indentation
  )(syntaxTree);
  if (recreatedQuery.length <= config.maxLineLength) {
    return {
      type: 'method',
      method: formatSyntaxTree(withNoEndDotInfo(config))(syntaxTree.method),
      // The arguments property is here so that the resulted syntax tree can
      // still be understood by recreateQueryOnelinerFromSyntaxTree
      arguments: syntaxTree.arguments,
      argumentGroups: [
        syntaxTree.arguments.map(
          formatSyntaxTree(pipe(withZeroIndentation, withZeroDotInfo)(config))
        ),
      ],
      argumentsShouldStartOnNewLine: false,
      indentation: config.indentation,
      shouldEndWithDot: config.shouldEndWithDot,
    };
  }
  // shouldEndWithDot has to reside on the method object, so the end dot can be
  // placed after the method parentheses. shouldStartWithDot has to be passed on
  // further down so the start dot can be placed after the indentation.
  return {
    type: 'method',
    method: formatSyntaxTree(withNoEndDotInfo(config))(syntaxTree.method),
    argumentGroups: syntaxTree.arguments.map((step) => [
      formatSyntaxTree(
        pipe(withIncreasedIndentation(2), withZeroDotInfo)(config)
      )(step),
    ]),
    argumentsShouldStartOnNewLine: true,
    shouldEndWithDot: config.shouldEndWithDot,
  };
};

module.exports = { formatMethod };
