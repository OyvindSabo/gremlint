import { FormattedWordSyntaxTree, GremlintInternalConfig, TokenType, UnformattedWordSyntaxTree } from '../types';

export const formatWord = (config: GremlintInternalConfig) => (
  syntaxTree: UnformattedWordSyntaxTree,
): FormattedWordSyntaxTree => {
  return {
    type: TokenType.Word,
    word: syntaxTree.word,
    localIndentation: config.localIndentation,
    shouldStartWithDot: Boolean(config.shouldStartWithDot),
    shouldEndWithDot: Boolean(config.shouldEndWithDot),
    width: syntaxTree.word.length,
  };
};
