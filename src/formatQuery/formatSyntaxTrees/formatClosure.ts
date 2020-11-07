import recreateQueryOnelinerFromSyntaxTree from '../recreateQueryOnelinerFromSyntaxTree';
import {
  FormattedClosureSyntaxTree,
  GremlinSyntaxTreeFormatter,
  GremlintConfig,
  TokenType,
  UnformattedClosureCodeBlock,
  UnformattedClosureLineOfCode,
  UnformattedClosureSyntaxTree,
} from '../types';
import { withNoEndDotInfo } from './utils';

const getClosureLineOfCodeIndentation = (
  relativeIndentation: number,
  horizontalPosition: number,
  methodWidth: number,
  lineNumber: number,
) => {
  if (lineNumber === 0) return Math.max(relativeIndentation, 0);
  return Math.max(relativeIndentation + horizontalPosition + methodWidth + 1, 0);
};

const getFormattedClosureLineOfCode = (horizontalPosition: number, methodWidth: number) => (
  { lineOfCode, relativeIndentation }: UnformattedClosureLineOfCode,
  lineNumber: number,
) => ({
  lineOfCode,
  relativeIndentation,
  indentation: getClosureLineOfCodeIndentation(relativeIndentation, horizontalPosition, methodWidth, lineNumber),
});

const getFormattedClosureCodeBlock = (
  unformattedClosureCodeBlock: UnformattedClosureCodeBlock,
  horizontalPosition: number,
  methodWidth: number,
) => {
  return unformattedClosureCodeBlock.map(getFormattedClosureLineOfCode(horizontalPosition, methodWidth));
};

export const formatClosure = (formatSyntaxTree: GremlinSyntaxTreeFormatter) => (config: GremlintConfig) => (
  syntaxTree: UnformattedClosureSyntaxTree,
): FormattedClosureSyntaxTree => {
  const { closureCodeBlock: unformattedClosureCodeBlock, method: unformattedMethod } = syntaxTree;
  const { indentation, horizontalPosition, maxLineLength, shouldEndWithDot } = config;
  const recreatedQueryLength = recreateQueryOnelinerFromSyntaxTree(indentation)(syntaxTree).length;
  const formattedMethod = formatSyntaxTree(withNoEndDotInfo(config))(unformattedMethod);
  const methodWidth = formattedMethod.width;

  if (recreatedQueryLength <= maxLineLength) {
    return {
      type: TokenType.Closure,
      method: formattedMethod,
      closureCodeBlock: getFormattedClosureCodeBlock(unformattedClosureCodeBlock, horizontalPosition, methodWidth),
      indentation,
      width: recreatedQueryLength,
      shouldStartWithDot: false,
      shouldEndWithDot: Boolean(shouldEndWithDot),
    };
  }

  return {
    type: TokenType.Closure,
    method: formattedMethod,
    closureCodeBlock: getFormattedClosureCodeBlock(unformattedClosureCodeBlock, horizontalPosition, methodWidth),
    indentation: 0,
    width: 0,
    shouldStartWithDot: false,
    shouldEndWithDot: Boolean(shouldEndWithDot),
  };
};
