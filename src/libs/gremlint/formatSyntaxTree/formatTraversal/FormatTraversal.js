const { recreateQueryOnelinerFromSyntaxTree } = include(
  'src/libs/gremlint/recreateQueryOnelinerFromSyntaxTree/RecreateQueryOnelinerFromSyntaxTree.js'
);
const { getStepGroups } = include(
  'src/libs/gremlint/formatSyntaxTree/formatTraversal/getStepGroups/GetStepGroups.js'
);
const { withZeroIndentation } = include(
  'src/libs/gremlint/formatSyntaxTree/utils.js'
);

// Groups steps into step groups and adds an indentation property
const formatTraversal = (formatSyntaxTree) => (config) => (syntaxTree) => {
  const recreatedQuery = recreateQueryOnelinerFromSyntaxTree(
    config.indentation
  )(syntaxTree);
  if (recreatedQuery.length <= config.maxLineLength) {
    return {
      type: 'traversal',
      stepGroups: [
        {
          steps: syntaxTree.steps.map((step, stepIndex) =>
            formatSyntaxTree(
              stepIndex === 0 ? config : withZeroIndentation(config)
            )(step)
          ),
        },
      ],
    };
  }
  return {
    type: 'traversal',
    stepGroups: getStepGroups(formatSyntaxTree, syntaxTree.steps, config),
  };
};

module.exports = { formatTraversal };
