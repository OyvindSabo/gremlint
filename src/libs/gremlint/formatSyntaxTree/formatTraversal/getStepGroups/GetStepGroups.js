const { pipe } = include('src/libs/simpleFP/SimpleFP.js');
const { withZeroIndentation, withIncreasedIndentation, withDotInfo } = include(
  'src/libs/gremlint/formatSyntaxTree/utils.js'
);
const { isTraversalSource, isModulator } = include(
  'src/libs/gremlint/formatSyntaxTree/formatTraversal/getStepGroups/utils.js'
);

const getStepGroups = (formatSyntaxTree, steps, config) => {
  const { stepGroups } = steps.reduce(
    ({ stepsInStepGroup, stepGroups }, step, index, steps) => {
      const isFirstStepInStepGroup = !stepsInStepGroup.length;

      // If it should be the last step in a line
      // We don't want to newline after words which are not methods. For
      // instance, g.V() should be one one line, as should __.as
      if (step.type === 'method' || index === steps.length - 1) {
        const isFirstStepGroup = stepGroups.length === 0;
        const isLastStepGroup = index === steps.length - 1;

        // If it is the first (and last) step in a line, format it with
        // indentation, otherwise, remove the indentation
        if (isFirstStepInStepGroup) {
          const traversalSourceIndentationIncrease =
            stepGroups[0] && isTraversalSource(stepGroups[0].steps[0]) ? 2 : 0;
          const modulatorIndentationIncrease = isModulator(step) ? 2 : 0;
          const indentationIncrease =
            traversalSourceIndentationIncrease + modulatorIndentationIncrease;

          // This is the only step in the step group, so it is the first step in
          // the step group. It should only start with a dot if it is not the
          // first stepGroup and config.shouldPlaceDotsAfterNewlines
          const shouldStartWithDot =
            !isFirstStepGroup && config.shouldPlaceDotsAfterNewlines;

          // It is the last step in a group and should only end with dot if not
          // config.shouldPlaceDotsAfterNewlines this is not the last step in
          // steps
          const shouldEndWithDot =
            !isLastStepGroup && !config.shouldPlaceDotsAfterNewlines;

          return {
            stepsInStepGroup: [],
            stepGroups: [
              ...stepGroups,
              {
                steps: [
                  formatSyntaxTree(
                    pipe(
                      withIncreasedIndentation(indentationIncrease),
                      withDotInfo({ shouldStartWithDot, shouldEndWithDot })
                    )(config)
                  )(step),
                ],
              },
            ],
          };
        }
        // If it is the last (and also not first) step in a group
        return (() => {
          // This is not the first step in the step group, so it should not
          // start with a dot
          const shouldStartWithDot = false;

          // It is the last step in a group and should only end with dot if not
          // config.shouldPlaceDotsAfterNewlines this is not the last step in
          // steps
          const shouldEndWithDot =
            !isLastStepGroup && !config.shouldPlaceDotsAfterNewlines;

          return {
            stepsInStepGroup: [],
            stepGroups: [
              ...stepGroups,
              {
                steps: [
                  ...stepsInStepGroup,
                  formatSyntaxTree(
                    pipe(
                      withZeroIndentation,
                      withDotInfo({ shouldStartWithDot, shouldEndWithDot })
                    )(config)
                  )(step),
                ],
              },
            ],
          };
        })();
      }

      // If it is the first step in a group and also not the last one, format it
      // with indentation, otherwise, remove the indentation
      if (isFirstStepInStepGroup) {
        const isFirstStepGroup = stepGroups.length === 0;

        // It is the first step in a group and should start with a dot if it is
        // not the first stepGroup and config.shouldPlaceDotsAfterNewlines
        const shouldStartWithDot =
          !isFirstStepGroup && config.shouldPlaceDotsAfterNewlines;

        // It is the first step in a group, but not the last, so it should not
        // end with a dot.
        const shouldEndWithDot = false;

        return {
          stepsInStepGroup: [
            formatSyntaxTree(
              withDotInfo({ shouldStartWithDot, shouldEndWithDot })(config)
            )(step),
          ],
          stepGroups,
        };
      }
      return (() => {
        // If it is not the first step in a group and not the last one either
        const shouldStartWithDot = false;
        const shouldEndWithDot = false;
        return {
          stepsInStepGroup: [
            ...stepsInStepGroup,
            formatSyntaxTree(
              pipe(
                withZeroIndentation,
                withDotInfo({ shouldStartWithDot, shouldEndWithDot })
              )(config)
            )(step),
          ],
          stepGroups,
        };
      })();
    },
    { stepsInStepGroup: [], stepGroups: [] }
  );
  return stepGroups;
};

module.exports = { getStepGroups };