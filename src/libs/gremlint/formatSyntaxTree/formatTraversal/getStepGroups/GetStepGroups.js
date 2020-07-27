const { withZeroIndentation, withIncreasedIndentation } = include(
  'src/libs/gremlint/formatSyntaxTree/utils.js'
);
const { isTraversalSource, isModulator } = include(
  'src/libs/gremlint/formatSyntaxTree/formatTraversal/getStepGroups/utils.js'
);

const getStepGroups = (formatSyntaxTree, steps, config) => {
  const { stepGroups } = steps.reduce(
    ({ stepsInStepGroup, stepGroups }, step, index, steps) => {
      // If it should be the last step in a line
      // We don't want to newline after words which are not methods. For
      // instance, g.V() should be one one line, as should __.as
      if (step.type === 'method' || index === steps.length - 1) {
        // If it is the first step, format it with indentation, otherwise,
        // remove the indentation
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

module.exports = { getStepGroups };
