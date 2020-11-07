import recreateQueryOnelinerFromSyntaxTree from '../../../recreateQueryOnelinerFromSyntaxTree';
import {
  GremlinStepGroup,
  FormattedSyntaxTree,
  GremlinSyntaxTreeFormatter,
  GremlintConfig,
  TokenType,
  UnformattedSyntaxTree,
} from '../../../types';
import { pipe, sum } from '../../../utils';
import {
  withDotInfo,
  withIncreasedHorizontalPosition,
  withIncreasedIndentation,
  withZeroIndentation,
} from '../../utils';
import { isModulator, isTraversalSource } from './utils';

export const getStepGroups = (
  formatSyntaxTree: GremlinSyntaxTreeFormatter,
  steps: UnformattedSyntaxTree[],
  config: GremlintConfig,
): GremlinStepGroup[] => {
  const { stepGroups } = steps.reduce(
    ({ stepsInStepGroup, stepGroups }, step, index, steps) => {
      const isFirstStepInStepGroup = !stepsInStepGroup.length;

      const isLastStep = index === steps.length - 1;
      const nextStepIsModulator = !isLastStep && isModulator(steps[index + 1]);
      const stepsWithSubsequentModulators = steps.slice(index + 1).reduce(
        (aggregator, step) => {
          const { stepsInStepGroup, hasReachedFinalModulator } = aggregator;
          if (hasReachedFinalModulator) return aggregator;
          if (isModulator(step)) {
            return {
              ...aggregator,
              stepsInStepGroup: [...stepsInStepGroup, step],
            };
          }
          return { ...aggregator, hasReachedFinalModulator: true };
        },
        {
          stepsInStepGroup: [...stepsInStepGroup, step],
          hasReachedFinalModulator: false,
        },
      ).stepsInStepGroup;

      const stepGroupIndentationIncrease = (() => {
        const traversalSourceIndentationIncrease = stepGroups[0] && isTraversalSource(stepGroups[0].steps[0]) ? 2 : 0;
        const modulatorIndentationIncrease = isModulator([...stepsInStepGroup, step][0]) ? 2 : 0;
        const indentationIncrease = traversalSourceIndentationIncrease + modulatorIndentationIncrease;
        return indentationIncrease;
      })();

      const recreatedQueryWithSubsequentModulators = recreateQueryOnelinerFromSyntaxTree(
        config.indentation + stepGroupIndentationIncrease,
      )({
        type: TokenType.Traversal,
        steps: stepsWithSubsequentModulators,
      });

      const lineIsTooLongWithSubsequentModulators =
        recreatedQueryWithSubsequentModulators.length > config.maxLineLength;

      // If the first step in a group is a modulator, then it must also be the last step in the group
      const shouldBeLastStepInStepGroup =
        isLastStep ||
        (isFirstStepInStepGroup && isModulator(step)) ||
        ((step.type === TokenType.Method || step.type === TokenType.Closure) &&
          !(nextStepIsModulator && !lineIsTooLongWithSubsequentModulators));

      // If it should be the last step in a line
      // We don't want to newline after words which are not methods. For
      // instance, g.V() should be one one line, as should __.as
      if (shouldBeLastStepInStepGroup) {
        const isFirstStepGroup = stepGroups.length === 0;
        const isLastStepGroup = index === steps.length - 1;

        // If it is the first (and last) step in a line, format it with
        // indentation, otherwise, remove the indentation
        if (isFirstStepInStepGroup) {
          const traversalSourceIndentationIncrease = stepGroups[0] && isTraversalSource(stepGroups[0].steps[0]) ? 2 : 0;
          const modulatorIndentationIncrease = isModulator(step) ? 2 : 0;
          const indentationIncrease = traversalSourceIndentationIncrease + modulatorIndentationIncrease;

          // This is the only step in the step group, so it is the first step in
          // the step group. It should only start with a dot if it is not the
          // first stepGroup and config.shouldPlaceDotsAfterLineBreaks
          const shouldStartWithDot = !isFirstStepGroup && config.shouldPlaceDotsAfterLineBreaks;

          // It is the last step in a group and should only end with dot if not
          // config.shouldPlaceDotsAfterLineBreaks this is not the last step in
          // steps
          const shouldEndWithDot = !isLastStepGroup && !config.shouldPlaceDotsAfterLineBreaks;

          return {
            stepsInStepGroup: [],
            stepGroups: [
              ...stepGroups,
              {
                steps: [
                  formatSyntaxTree(
                    pipe(
                      withIncreasedIndentation(indentationIncrease),
                      withDotInfo({ shouldStartWithDot, shouldEndWithDot }),
                      withIncreasedHorizontalPosition(indentationIncrease),
                    )(config),
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
          // config.shouldPlaceDotsAfterLineBreaks this is not the last step in
          // steps
          const shouldEndWithDot = !isLastStepGroup && !config.shouldPlaceDotsAfterLineBreaks;

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
                      withDotInfo({ shouldStartWithDot, shouldEndWithDot }),
                      withIncreasedHorizontalPosition(
                        stepsInStepGroup.map(({ width }) => width).reduce(sum, 0) + stepsInStepGroup.length,
                      ),
                    )(config),
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
        const indentationIncrease = stepGroups[0] && isTraversalSource(stepGroups[0].steps[0]) ? 2 : 0;

        const isFirstStepGroup = stepGroups.length === 0;

        // It is the first step in a group and should start with a dot if it is
        // not the first stepGroup and config.shouldPlaceDotsAfterLineBreaks
        const shouldStartWithDot = !isFirstStepGroup && config.shouldPlaceDotsAfterLineBreaks;

        // It is the first step in a group, but not the last, so it should not
        // end with a dot.
        const shouldEndWithDot = false;

        return {
          stepsInStepGroup: [
            formatSyntaxTree(
              pipe(
                withIncreasedIndentation(indentationIncrease),
                withDotInfo({ shouldStartWithDot, shouldEndWithDot }),
                withIncreasedHorizontalPosition(indentationIncrease),
              )(config),
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
                withDotInfo({ shouldStartWithDot, shouldEndWithDot }),
                withIncreasedHorizontalPosition(
                  stepsInStepGroup.map(({ width }) => width).reduce(sum, 0) + stepsInStepGroup.length,
                ),
              )(config),
            )(step),
          ],
          stepGroups,
        };
      })();
    },
    {
      stepsInStepGroup: [] as FormattedSyntaxTree[],
      stepGroups: [] as GremlinStepGroup[],
    },
  );
  return stepGroups;
};
