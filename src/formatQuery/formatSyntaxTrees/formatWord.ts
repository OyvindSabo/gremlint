import { FormattedWordSyntaxTree, GremlintConfig, TokenType, UnformattedWordSyntaxTree } from '../types';

export const formatWord = (config: GremlintConfig) => (
  syntaxTree: UnformattedWordSyntaxTree,
): FormattedWordSyntaxTree => {
  return {
    type: TokenType.Word,
    word: syntaxTree.word,
    indentation: config.indentation,
    shouldStartWithDot: Boolean(config.shouldStartWithDot),
    shouldEndWithDot: Boolean(config.shouldEndWithDot),
    width: syntaxTree.word.length,
  };
};
