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
  | FormattedStringSyntaxTree
  | FormattedWordSyntaxTree;

export type GremlinSyntaxTreeFormatter = (
  config: GremlintConfig,
) => (syntaxTree: UnformattedSyntaxTree) => FormattedSyntaxTree;
