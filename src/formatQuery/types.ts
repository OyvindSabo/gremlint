export type GremlintConfig = {
  indentation: number;
  maxLineLength: number;
  shouldPlaceDotsAfterLineBreaks: boolean;
  shouldEndWithDot: boolean;
  shouldStartWithDot: boolean;
  horizontalPosition: number; // Will be used by child syntax trees and is the width before its child content starts, so hasLabel(...) has a width of 9
};

export enum TokenType {
  NonGremlinCode = 'NON_GREMLIN_CODE',
  Traversal = 'TRAVERSAL',
  Method = 'METHOD',
  Closure = 'CLOSURE',
  String = 'STRING',
  Word = 'WORD',
}

export type UnformattedNonGremlinSyntaxTree = {
  type: TokenType.NonGremlinCode;
  code: string;
};

export type UnformattedTraversalSyntaxTree = {
  type: TokenType.Traversal;
  steps: UnformattedSyntaxTree[];
};

export type UnformattedMethodSyntaxTree = {
  type: TokenType.Method;
  method: UnformattedSyntaxTree;
  arguments: UnformattedSyntaxTree[];
};

export type UnformattedClosureLineOfCode = {
  lineOfCode: string;
  // Relative indentation compared to the opening curly bracket, so relativeIndentation of In {it.get} is 0.
  relativeIndentation: number;
};

export type UnformattedClosureCodeBlock = UnformattedClosureLineOfCode[];

export type UnformattedClosureSyntaxTree = {
  type: TokenType.Closure;
  method: UnformattedSyntaxTree;
  closureCodeBlock: UnformattedClosureCodeBlock;
};

export type UnformattedStringSyntaxTree = {
  type: TokenType.String;
  string: string;
};

export type UnformattedWordSyntaxTree = {
  type: TokenType.Word;
  word: string;
};

export type UnformattedSyntaxTree =
  | UnformattedMethodSyntaxTree
  | UnformattedClosureSyntaxTree
  | UnformattedStringSyntaxTree
  | UnformattedWordSyntaxTree
  | UnformattedTraversalSyntaxTree
  | UnformattedNonGremlinSyntaxTree;

export type FormattedNonGremlinSyntaxTree = UnformattedNonGremlinSyntaxTree & {
  width: number;
};

export type GremlinStepGroup = {
  steps: FormattedSyntaxTree[];
};

export type FormattedTraversalSyntaxTree = {
  type: TokenType.Traversal;
  steps: UnformattedSyntaxTree[];
  stepGroups: GremlinStepGroup[];
  indentation: number;
  width: number;
};

export type FormattedMethodSyntaxTree = {
  type: TokenType.Method;
  method: FormattedSyntaxTree;
  arguments: UnformattedSyntaxTree[];
  argumentGroups: FormattedSyntaxTree[][];
  argumentsShouldStartOnNewLine: boolean;
  indentation: number;
  width: number;
  shouldStartWithDot: boolean;
  shouldEndWithDot: boolean;
};

type FormattedClosureLineOfCode = {
  lineOfCode: string;
  relativeIndentation: number;
  indentation: number;
};

type FormattedClosureCodeBlock = FormattedClosureLineOfCode[];

export type FormattedClosureSyntaxTree = {
  type: TokenType.Closure;
  method: FormattedSyntaxTree;
  closureCodeBlock: FormattedClosureCodeBlock;
  indentation: number;
  width: number;
  shouldStartWithDot: boolean;
  shouldEndWithDot: boolean;
};

export type FormattedStringSyntaxTree = {
  type: TokenType.String;
  string: string;
  width: number;
  indentation: number;
};

export type FormattedWordSyntaxTree = {
  type: TokenType.Word;
  word: string;
  indentation: number;
  width: number;
  shouldStartWithDot: boolean;
  shouldEndWithDot: boolean;
};

export type FormattedSyntaxTree =
  | FormattedTraversalSyntaxTree
  | FormattedMethodSyntaxTree
  | FormattedClosureSyntaxTree
  | FormattedStringSyntaxTree
  | FormattedWordSyntaxTree
  | FormattedNonGremlinSyntaxTree;

export type GremlinSyntaxTreeFormatter = (
  config: GremlintConfig,
) => (syntaxTree: UnformattedSyntaxTree) => FormattedSyntaxTree;
