import { FormattedStringSyntaxTree, GremlintInternalConfig, TokenType, UnformattedStringSyntaxTree } from '../types';

export const formatString = (config: GremlintInternalConfig) => (
  syntaxTree: UnformattedStringSyntaxTree,
): FormattedStringSyntaxTree => {
  return {
    type: TokenType.String,
    string: syntaxTree.string,
    localIndentation: config.localIndentation,
    width: syntaxTree.string.length + 2,
  };
};
