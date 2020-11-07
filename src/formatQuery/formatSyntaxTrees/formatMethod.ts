import recreateQueryOnelinerFromSyntaxTree from '../recreateQueryOnelinerFromSyntaxTree';
import {
  FormattedMethodSyntaxTree,
  GremlinSyntaxTreeFormatter,
  GremlintConfig,
  TokenType,
  UnformattedMethodSyntaxTree,
} from '../types';
import { last, pipe, sum } from '../utils';
import {
  withIncreasedHorizontalPosition,
  withIncreasedIndentation,
  withNoEndDotInfo,
  withZeroDotInfo,
  withZeroIndentation,
} from './utils';

// Groups arguments into argument groups an adds an indentation property
export const formatMethod = (formatSyntaxTree: GremlinSyntaxTreeFormatter) => (config: GremlintConfig) => (
  syntaxTree: UnformattedMethodSyntaxTree,
): FormattedMethodSyntaxTree => {
  const recreatedQueryLength = recreateQueryOnelinerFromSyntaxTree(config.indentation)(syntaxTree).length;
  const method = formatSyntaxTree(withNoEndDotInfo(config))(syntaxTree.method);
  if (recreatedQueryLength <= config.maxLineLength) {
    return {
      type: TokenType.Method,
      method,
      // The arguments property is here so that the resulted syntax tree can
      // still be understood by recreateQueryOnelinerFromSyntaxTree
      arguments: syntaxTree.arguments,
      argumentGroups: [
        syntaxTree.arguments.map(
          formatSyntaxTree(
            // Since the method's arguments will be on the same line, their horizontal position is increased by the
            // method's width plus the width of the opening parenthesis
            pipe(withZeroIndentation, withZeroDotInfo, withIncreasedHorizontalPosition(method.width + 1))(config),
          ),
        ),
      ],
      argumentsShouldStartOnNewLine: false,
      indentation: config.indentation,
      shouldStartWithDot: false,
      shouldEndWithDot: Boolean(config.shouldEndWithDot),
      width: recreatedQueryLength,
    };
  }
  // shouldEndWithDot has to reside on the method object, so the end dot can be
  // placed after the method parentheses. shouldStartWithDot has to be passed on
  // further down so the start dot can be placed after the indentation.
  const argumentGroups = syntaxTree.arguments.map((step) => [
    formatSyntaxTree(
      pipe(withIncreasedIndentation(2), withZeroDotInfo, withIncreasedHorizontalPosition(method.width + 2))(config),
    )(step),
  ]);
  const lastArgumentGroup = last(argumentGroups);
  // Add the width of the last line of parameters, the dots between them and the indentation of the parameters
  const width = lastArgumentGroup.map(({ width }) => width).reduce(sum, 0) + lastArgumentGroup.length - 1;
  return {
    type: TokenType.Method,
    method,
    arguments: syntaxTree.arguments,
    argumentGroups,
    argumentsShouldStartOnNewLine: true,
    shouldStartWithDot: false,
    shouldEndWithDot: Boolean(config.shouldEndWithDot),
    indentation: 0,
    width,
  };
};
