export type GremlintUserConfig = {
  indentation: number;
  maxLineLength: number;
  shouldPlaceDotsAfterLineBreaks: boolean;
};

export type GremlintInternalConfig = {
  globalIndentation: number;
  localIndentation: number;
  maxLineLength: number;
  shouldPlaceDotsAfterLineBreaks: boolean;
  shouldStartWithDot: boolean;
  shouldEndWithDot: boolean;
  horizontalPosition: number; // Will be used by child syntax trees and is the horizontal position its child content starts, so a non-indented hasLabel(...) has a horizontal position of 9
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
  localIndentation: number;
  width: number;
};

export type FormattedMethodSyntaxTree = {
  type: TokenType.Method;
  method: FormattedSyntaxTree;
  arguments: UnformattedSyntaxTree[];
  argumentGroups: FormattedSyntaxTree[][];
  argumentsShouldStartOnNewLine: boolean;
  localIndentation: number;
  width: number;
  shouldStartWithDot: boolean;
  shouldEndWithDot: boolean;
};

type FormattedClosureLineOfCode = {
  lineOfCode: string;
  relativeIndentation: number;
  localIndentation: number;
};

type FormattedClosureCodeBlock = FormattedClosureLineOfCode[];

export type FormattedClosureSyntaxTree = {
  type: TokenType.Closure;
  method: FormattedSyntaxTree;
  closureCodeBlock: FormattedClosureCodeBlock;
  localIndentation: number;
  width: number;
  shouldStartWithDot: boolean;
  shouldEndWithDot: boolean;
};

export type FormattedStringSyntaxTree = {
  type: TokenType.String;
  string: string;
  width: number;
  localIndentation: number;
};

export type FormattedWordSyntaxTree = {
  type: TokenType.Word;
  word: string;
  localIndentation: number;
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
  config: GremlintInternalConfig,
) => (syntaxTree: UnformattedSyntaxTree) => FormattedSyntaxTree;
