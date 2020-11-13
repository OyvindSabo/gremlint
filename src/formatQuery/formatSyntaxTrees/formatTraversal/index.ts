import recreateQueryOnelinerFromSyntaxTree from '../../recreateQueryOnelinerFromSyntaxTree';
import {
  FormattedTraversalSyntaxTree,
  GremlinSyntaxTreeFormatter,
  GremlintInternalConfig,
  TokenType,
  UnformattedTraversalSyntaxTree,
} from '../../types';
import { last, sum } from '../../utils';
import { withZeroIndentation } from '../utils';
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
          steps: syntaxTree.steps.map((step, stepIndex) =>
            formatSyntaxTree(stepIndex === 0 ? config : withZeroIndentation(config))(step),
          ),
        },
      ],
      localIndentation: 0,
      width: recreatedQueryLength,
    };
  }
  const stepGroups = getStepGroups(formatSyntaxTree, syntaxTree.steps, config);
  const width =
    last(stepGroups)
      .steps.map(({ width }) => width)
      .reduce(sum, 0) +
    stepGroups.length -
    1;
  return {
    type: TokenType.Traversal,
    steps: syntaxTree.steps,
    stepGroups,
    localIndentation: 0,
    width,
  };
};
