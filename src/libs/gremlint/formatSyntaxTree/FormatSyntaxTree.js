const { recreateQueryOnelinerFromSyntaxTree } = include(
  'src/libs/gremlint/recreateQueryOnelinerFromSyntaxTree/RecreateQueryOnelinerFromSyntaxTree.js'
);

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
                steps: [formatSyntaxTree(config)(step)],
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
                formatSyntaxTree({ ...config, indentation: 0 })(step),
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
            formatSyntaxTree({ ...config, indentation: 0 })(step),
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
const formatSyntaxTree = (config = { indentation: 0, maxLineLength: 80 }) => (
  syntaxTree
) => {
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
                  index === 0
                    ? config
                    : {
                        ...config,
                        indentation: 0,
                      }
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
              formatSyntaxTree({
                ...config,
                indentation: 0,
              })(step)
            ),
          ],
          argumentsShouldStartOnNewLine: false,
        }
      : {
          type: 'method',
          method: formatSyntaxTree(config)(syntaxTree.method),
          argumentGroups: syntaxTree.arguments.map((step) => [
            formatSyntaxTree({
              ...config,
              indentation: config.indentation + 2,
            })(step),
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
