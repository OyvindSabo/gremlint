const { recreateQueryOnelinerFromSyntaxTree } = include(
  'src/libs/gremlint/recreateQueryOnelinerFromSyntaxTree/RecreateQueryOnelinerFromSyntaxTree.js'
);

const isTraversalSource = (step) => step.type === 'word' && step.word === 'g';

const isModulator = (step) =>
  step.type === 'method' &&
  step.method.type === 'word' &&
  ['by', 'as', 'option', 'from', 'to', 'read', 'write'].includes(
    step.method.word
  );

const withIndentation = (config, indentation) => ({ ...config, indentation });

const withZeroIndentation = (config) => withIndentation(config, 0);

const withIncreasedIndentation = (config, indentationIncrease) => ({
  ...config,
  indentation: config.indentation + indentationIncrease,
});

const getStepGroups = (steps, config) => {
  const { stepGroups } = steps.reduce(
    ({ stepsInStepGroup, stepGroups }, step, index, steps) => {
      // If it should be the last step in a line
      // We don't want to newline after words which are not methods. For
      // instance, g.V() should be one one line, as should __.as
      if (step.type === 'method' || index === steps.length - 1) {
        // If it is the first step, format it with indentation, otherwise, remove the indentation
        if (!stepsInStepGroup.length) {
          const traversalSourceIndentationIncrease =
            stepGroups[0] && isTraversalSource(stepGroups[0].steps[0]) ? 2 : 0;
          const modulatorIndentationIncrease = isModulator(step) ? 2 : 0;
          const indentationIncrease =
            traversalSourceIndentationIncrease + modulatorIndentationIncrease;

          return {
            stepsInStepGroup: [],
            stepGroups: [
              ...stepGroups,
              {
                steps: [
                  formatSyntaxTree(
                    withIncreasedIndentation(config, indentationIncrease)
                  )(step),
                ],
              },
            ],
          };
        }
        return {
          stepsInStepGroup: [],
          stepGroups: [
            ...stepGroups,
            {
              steps: [
                ...stepsInStepGroup,
                formatSyntaxTree(withZeroIndentation(config))(step),
              ],
            },
          ],
        };
      }
      // If it is the first step, format it with indentation, otherwise, remove the indentation
      if (!stepsInStepGroup.length) {
        return {
          stepsInStepGroup: [formatSyntaxTree(config)(step)],
          stepGroups,
        };
      }
      return {
        stepsInStepGroup: [
          ...stepsInStepGroup,
          formatSyntaxTree(withZeroIndentation(config))(step),
        ],
        stepGroups,
      };
    },
    { stepsInStepGroup: [], stepGroups: [] }
  );
  return stepGroups;
};

// Groups steps into stepGroups and argumentGroups respectively and adds an indentation property
const formatSyntaxTree = (config) => (syntaxTree) => {
  const recreatedQuery = recreateQueryOnelinerFromSyntaxTree(
    config.indentation
  )(syntaxTree);
  if (syntaxTree.type === 'traversal') {
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
      stepGroups: getStepGroups(syntaxTree.steps, config),
    };
  }

  if (syntaxTree.type === 'method') {
    if (recreatedQuery.length <= config.maxLineLength) {
      return {
        type: 'method',
        method: formatSyntaxTree(config)(syntaxTree.method),
        argumentGroups: [
          syntaxTree.arguments.map(
            formatSyntaxTree(withZeroIndentation(config))
          ),
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
  }

  if (syntaxTree.type === 'string') {
    return {
      type: 'string',
      string: syntaxTree.string,
      indentation: config.indentation,
    };
  }

  if (syntaxTree.type === 'word') {
    return {
      type: 'word',
      word: syntaxTree.word,
      indentation: config.indentation,
    };
  }
};

module.exports = { formatSyntaxTree };
