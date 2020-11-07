import recreateQueryOnelinerFromSyntaxTree from '../../recreateQueryOnelinerFromSyntaxTree';
import {
  FormattedTraversalSyntaxTree,
  GremlinSyntaxTreeFormatter,
  GremlintConfig,
  TokenType,
  UnformattedTraversalSyntaxTree,
} from '../../types';
import { last, sum } from '../../utils';
import { withZeroIndentation } from '../utils';
import { getStepGroups } from './getStepGroups';

// Groups steps into step groups and adds an indentation property
export const formatTraversal = (formatSyntaxTree: GremlinSyntaxTreeFormatter) => (config: GremlintConfig) => (
  syntaxTree: UnformattedTraversalSyntaxTree,
): FormattedTraversalSyntaxTree => {
  const recreatedQueryLength = recreateQueryOnelinerFromSyntaxTree(config.indentation)(syntaxTree).length;
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
      indentation: 0,
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
    indentation: 0,
    width,
  };
};
