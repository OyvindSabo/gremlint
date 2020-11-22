import recreateQueryOnelinerFromSyntaxTree from '../recreateQueryOnelinerFromSyntaxTree';
import {
  FormattedMethodSyntaxTree,
  FormattedSyntaxTree,
  GremlinSyntaxTreeFormatter,
  GremlintInternalConfig,
  TokenType,
  UnformattedMethodSyntaxTree,
} from '../types';
import { last, pipe, sum } from '../utils';
import {
  withHorizontalPosition,
  withIncreasedHorizontalPosition,
  withIncreasedIndentation,
  withNoEndDotInfo,
  withZeroDotInfo,
  withZeroIndentation,
} from './utils';

// Groups arguments into argument groups an adds a localIndentation property
export const formatMethod = (formatSyntaxTree: GremlinSyntaxTreeFormatter) => (config: GremlintInternalConfig) => (
  syntaxTree: UnformattedMethodSyntaxTree,
): FormattedMethodSyntaxTree => {
  const recreatedQueryLength = recreateQueryOnelinerFromSyntaxTree(config.localIndentation)(syntaxTree).length;
  const method = formatSyntaxTree(withNoEndDotInfo(config))(syntaxTree.method);
  const argumentsWillNotBeWrapped = recreatedQueryLength <= config.maxLineLength;
  if (argumentsWillNotBeWrapped) {
    return {
      type: TokenType.Method,
      method,
      // The arguments property is here so that the resulted syntax tree can
      // still be understood by recreateQueryOnelinerFromSyntaxTree
      arguments: syntaxTree.arguments,
      argumentGroups: [
        syntaxTree.arguments.reduce((argumentGroup: FormattedSyntaxTree[], syntaxTree) => {
          return [
            ...argumentGroup,
            formatSyntaxTree(
              // Since the method's arguments will be on the same line, their horizontal position is increased by the
              // method's width plus the width of the opening parenthesis
              pipe(
                withZeroIndentation,
                withZeroDotInfo,
                withIncreasedHorizontalPosition(
                  method.width + 1 + argumentGroup.map(({ width }) => width).reduce(sum, 0) + argumentGroup.length,
                ),
              )(config),
            )(syntaxTree),
          ];
        }, []),
      ],
      argumentsShouldStartOnNewLine: false,
      localIndentation: config.localIndentation,
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
      pipe(
        withIncreasedIndentation(2),
        withZeroDotInfo,
        withHorizontalPosition(config.localIndentation + method.width),
      )(config),
    )(step),
  ]);
  const lastArgumentGroup = last(argumentGroups);
  // Add the width of the last line of parameters, the dots between them and the indentation of the parameters
  const width = lastArgumentGroup
    ? lastArgumentGroup.map(({ width }) => width).reduce(sum, 0) + lastArgumentGroup.length - 1
    : 0;
  return {
    type: TokenType.Method,
    method,
    arguments: syntaxTree.arguments,
    argumentGroups,
    argumentsShouldStartOnNewLine: true,
    shouldStartWithDot: false,
    shouldEndWithDot: Boolean(config.shouldEndWithDot),
    localIndentation: 0,
    width,
  };
};
