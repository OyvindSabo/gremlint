const { recreateQueryOnelinerFromSyntaxTree } = include(
  'src/libs/gremlint/recreateQueryOnelinerFromSyntaxTree/RecreateQueryOnelinerFromSyntaxTree.js'
);

const getStepGroups = (steps, indentation) => {
  const { stepGroups } = steps.reduce(
    ({ stepsInStepGroup, stepGroups }, step, index, steps) => {
      return step.type === 'method' || index === steps.length - 1
        ? {
            stepsInStepGroup: [],
            stepGroups: [
              ...stepGroups,
              // TODO: Here, the indentation should be incresed if the current step group is a modulator of the previous stepGroup. Anything is a modulator of a stepGroup which contains the word g. Other modulators, like as and by will have to be hard coded.
              {
                indentation,
                steps: [...stepsInStepGroup, step],
              },
            ],
          }
        : {
            stepsInStepGroup: [...stepsInStepGroup, step],
            stepGroups,
          };
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
              indentation: config.indentation,
              steps: syntaxTree.steps.map((step) =>
                formatSyntaxTree(config)(step)
              ),
            },
          ],
        }
      : {
          type: 'traversal',
          stepGroups: getStepGroups(
            syntaxTree.steps.map((step) => formatSyntaxTree(config)(step)),
            config.indentation
          ),
        };
  }

  // TODO
  if (syntaxTree.type === 'method') {
    console.log('formatSyntaxTree config: ', config);
    return recreatedQuery.length <= config.maxLineLength
      ? {
          type: 'method',
          method: formatSyntaxTree(config)(syntaxTree.method),
          argumentGroups: [
            syntaxTree.arguments.map((step) => formatSyntaxTree(config)(step)),
          ],
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
