export type GremlintConfig = {
  indentation: number;
  maxLineLength: number;
  shouldPlaceDotsAfterLineBreaks: boolean;
};

export type DotInfo = {
  shouldEndWithDot?: boolean;
  shouldStartWithDot?: boolean;
};

export type ExtendedGremlintConfig = GremlintConfig & DotInfo;

export enum TokenType {
  Method = 'METHOD',
  Closure = 'CLOSURE',
  String = 'STRING',
  Word = 'WORD',
  Traversal = 'TRAVERSAL',
}

export type UnformattedTraversalSyntaxTree = {
  type: TokenType.Traversal;
  steps: UnformattedSyntaxTree[];
};

export type UnformattedMethodSyntaxTree = {
  type: TokenType.Method;
  method: UnformattedSyntaxTree;
  arguments: UnformattedSyntaxTree[];
};

export type UnformattedClosureSyntaxTree = {
  type: TokenType.Closure;
  method: UnformattedSyntaxTree;
  closureCodeBlock: string;
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
  | UnformattedTraversalSyntaxTree;

export type GremlinStepGroup = {
  steps: FormattedSyntaxTree[];
};

export type FormattedTraversalSyntaxTree = {
  type: TokenType.Traversal;
  steps: UnformattedSyntaxTree[];
  stepGroups: GremlinStepGroup[];
  indentation: number;
};

export type FormattedMethodSyntaxTree = {
  type: TokenType.Method;
  method: FormattedSyntaxTree;
  arguments: UnformattedSyntaxTree[];
  argumentGroups: FormattedSyntaxTree[][];
  argumentsShouldStartOnNewLine: boolean;
  indentation: number;
  shouldStartWithDot: boolean;
  shouldEndWithDot: boolean;
};

export type FormattedClosureSyntaxTree = {
  type: TokenType.Closure;
  method: FormattedSyntaxTree;
  closureCodeBlock: string;
  indentation: number;
  shouldStartWithDot: boolean;
  shouldEndWithDot: boolean;
};

export type FormattedStringSyntaxTree = {
  type: TokenType.String;
  string: string;
  indentation: number;
};

export type FormattedWordSyntaxTree = {
  type: TokenType.Word;
  word: string;
  indentation: number;
  shouldStartWithDot: boolean;
  shouldEndWithDot: boolean;
};

export type FormattedSyntaxTree =
  | FormattedTraversalSyntaxTree
  | FormattedMethodSyntaxTree
  | FormattedClosureSyntaxTree
  | FormattedStringSyntaxTree
  | FormattedWordSyntaxTree;

export type GremlinSyntaxTreeFormatter = (
  config: GremlintConfig,
) => (syntaxTree: UnformattedSyntaxTree) => FormattedSyntaxTree;
