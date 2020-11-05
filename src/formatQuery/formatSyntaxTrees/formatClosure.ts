import recreateQueryOnelinerFromSyntaxTree from '../recreateQueryOnelinerFromSyntaxTree';
import {
  ExtendedGremlintConfig,
  FormattedClosureSyntaxTree,
  GremlinSyntaxTreeFormatter,
  TokenType,
  UnformattedClosureSyntaxTree,
} from '../types';
import { withNoEndDotInfo } from './utils';

export const formatClosure = (formatSyntaxTree: GremlinSyntaxTreeFormatter) => (config: ExtendedGremlintConfig) => (
  syntaxTree: UnformattedClosureSyntaxTree,
): FormattedClosureSyntaxTree => {
  const recreatedQuery = recreateQueryOnelinerFromSyntaxTree(config.indentation)(syntaxTree);
  if (recreatedQuery.length <= config.maxLineLength) {
    return {
      type: TokenType.Closure,
      method: formatSyntaxTree(withNoEndDotInfo(config))(syntaxTree.method),
      closureCodeBlock: syntaxTree.closureCodeBlock,
      indentation: config.indentation,
      shouldStartWithDot: false,
      shouldEndWithDot: Boolean(config.shouldEndWithDot),
    };
  }
  return {
    type: TokenType.Closure,
    method: formatSyntaxTree(withNoEndDotInfo(config))(syntaxTree.method),
    closureCodeBlock: syntaxTree.closureCodeBlock,
    indentation: 0,
    shouldStartWithDot: false,
    shouldEndWithDot: Boolean(config.shouldEndWithDot),
  };
};
