import recreateQueryOnelinerFromSyntaxTree from '../../recreateQueryOnelinerFromSyntaxTree';
import {
  FormattedSyntaxTree,
  FormattedTraversalSyntaxTree,
  GremlinSyntaxTreeFormatter,
  GremlintInternalConfig,
  TokenType,
  UnformattedTraversalSyntaxTree,
} from '../../types';
import { last, pipe, sum } from '../../utils';
import { withHorizontalPosition, withIncreasedHorizontalPosition, withZeroIndentation } from '../utils';
import { getStepGroups } from './getStepGroups';

// Groups steps into step groups and adds a localIndentation property
export const formatTraversal = (formatSyntaxTree: GremlinSyntaxTreeFormatter) => (config: GremlintInternalConfig) => (
  syntaxTree: UnformattedTraversalSyntaxTree,
): FormattedTraversalSyntaxTree => {
  const recreatedQueryLength = recreateQueryOnelinerFromSyntaxTree(config.localIndentation)(syntaxTree).length;
  if (recreatedQueryLength <= config.maxLineLength) {
    return {
      type: TokenType.Traversal,
      steps: syntaxTree.steps,
      stepGroups: [
        {
          steps: syntaxTree.steps.reduce((steps, step, stepIndex) => {
            const formattedStep =
              stepIndex === 0
                ? formatSyntaxTree(withIncreasedHorizontalPosition(syntaxTree.initialHorizontalPosition)(config))(step)
                : // Since the traversal's steps will be on the same line, their horizontal position is increased by the
                  // steps's width plus the width of the dots between them
                  formatSyntaxTree(
                    pipe(
                      withZeroIndentation,
                      withIncreasedHorizontalPosition(
                        syntaxTree.initialHorizontalPosition +
                          steps.map(({ width }) => width).reduce(sum, 0) +
                          steps.length,
                      ),
                    )(config),
                  )(step);
            return [...steps, formattedStep];
          }, [] as FormattedSyntaxTree[]),
        },
      ],
      initialHorizontalPosition: syntaxTree.initialHorizontalPosition,
      localIndentation: 0,
      width: recreatedQueryLength,
    };
  }
  const stepGroups = getStepGroups(formatSyntaxTree, syntaxTree.steps, config);
  const lastStepGroup = last(stepGroups);
  const width = lastStepGroup
    ? lastStepGroup.steps.map(({ width }) => width).reduce(sum, 0) + stepGroups.length - 1
    : 0;
  return {
    type: TokenType.Traversal,
    steps: syntaxTree.steps,
    stepGroups,
    initialHorizontalPosition: syntaxTree.initialHorizontalPosition,
    localIndentation: 0,
    width,
  };
};
