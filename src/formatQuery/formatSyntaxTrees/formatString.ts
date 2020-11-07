import { FormattedStringSyntaxTree, GremlintConfig, TokenType, UnformattedStringSyntaxTree } from '../types';

export const formatString = (config: GremlintConfig) => (
  syntaxTree: UnformattedStringSyntaxTree,
): FormattedStringSyntaxTree => {
  return {
    type: TokenType.String,
    string: syntaxTree.string,
    indentation: config.indentation,
    width: syntaxTree.string.length + 2,
  };
};
