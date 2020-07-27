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
      // TODO: We need to make sure that indentation is zero for all steps which are not the first in the step group
      // If it should be the last step in a line
      if (step.type === 'method' || index === steps.length - 1) {
        // If it is the first step, format it with indentation, otherwise, remove the indentation
        if (!stepsInStepGroup.length) {
          return {
            stepsInStepGroup: [],
            stepGroups: [
              ...stepGroups,
              // TODO: Here, the indentation should be increased if the current step group is a modulator of the previous stepGroup. Anything is a modulator of a stepGroup which contains the word g. Other modulators, like as and by will have to be hard coded.
              {
                steps: [
                  formatSyntaxTree(
                    withIncreasedIndentation(
                      config,
                      (stepGroups[0] &&
                      isTraversalSource(stepGroups[0].steps[0])
                        ? 2
                        : 0) + (isModulator(step) ? 2 : 0)
                    )
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
            // TODO: Here, the indentation should be increased if the current step group is a modulator of the previous stepGroup. Anything is a modulator of a stepGroup which contains the word g. Other modulators, like as and by will have to be hard coded.
            {
              steps: [
                ...stepsInStepGroup,
                formatSyntaxTree(withZeroIndentation(config))(step),
              ],
            },
          ],
        };
      } else {
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
      }
    },
    { stepsInStepGroup: [], stepGroups: [] }
  );
  return stepGroups;
};

// Groups steps into stepGroups and argumentGroups respectively and adds an indentation property
// TODO: Rewrite RecreateQueryStringFromFormattedSyntaxTree to support this
const formatSyntaxTree = (config) => (syntaxTree) => {
  const recreatedQuery = recreateQueryOnelinerFromSyntaxTree(
    config.indentation
  )(syntaxTree);
  if (syntaxTree.type === 'traversal') {
    return recreatedQuery.length <= config.maxLineLength
      ? {
          type: 'traversal',
          stepGroups: [
            {
              steps: syntaxTree.steps.map((step, index) =>
                formatSyntaxTree(
                  index === 0 ? config : withZeroIndentation(config)
                )(step)
              ),
            },
          ],
        }
      : {
          type: 'traversal',
          stepGroups: getStepGroups(syntaxTree.steps, config),
        };
  }

  if (syntaxTree.type === 'method') {
    return recreatedQuery.length <= config.maxLineLength
      ? {
          type: 'method',
          method: formatSyntaxTree(config)(syntaxTree.method),
          argumentGroups: [
            syntaxTree.arguments.map((step) =>
              formatSyntaxTree(withZeroIndentation(config))(step)
            ),
          ],
          argumentsShouldStartOnNewLine: false,
        }
      : {
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
