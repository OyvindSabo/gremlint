import recreateQueryOnelinerFromSyntaxTree from '../../recreateQueryOnelinerFromSyntaxTree';
import {
  FormattedTraversalSyntaxTree,
  GremlinSyntaxTreeFormatter,
  GremlintConfig,
  TokenType,
  UnformattedTraversalSyntaxTree,
} from '../../types';
import { withZeroIndentation } from '../utils';
import { getStepGroups } from './getStepGroups';

// Groups steps into step groups and adds an indentation property
export const formatTraversal = (formatSyntaxTree: GremlinSyntaxTreeFormatter) => (config: GremlintConfig) => (
  syntaxTree: UnformattedTraversalSyntaxTree,
): FormattedTraversalSyntaxTree => {
  const recreatedQuery = recreateQueryOnelinerFromSyntaxTree(config.indentation)(syntaxTree);
  if (recreatedQuery.length <= config.maxLineLength) {
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
    };
  }
  return {
    type: TokenType.Traversal,
    steps: syntaxTree.steps,
    stepGroups: getStepGroups(formatSyntaxTree, syntaxTree.steps, config),
    indentation: 0,
  };
};
