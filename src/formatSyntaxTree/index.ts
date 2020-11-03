import { FormattedSyntaxTree, GremlintConfig, TokenType, UnformattedSyntaxTree } from '../types';
import { formatMethod } from './formatMethod';
import { formatString } from './formatString';
import { formatTraversal } from './formatTraversal';
import { formatWord } from './formatWord';

export const formatSyntaxTree = (config: GremlintConfig) => (
  syntaxTree: UnformattedSyntaxTree,
): FormattedSyntaxTree => {
  switch (syntaxTree.type) {
    case TokenType.Traversal:
      return formatTraversal(formatSyntaxTree)(config)(syntaxTree);
    case TokenType.Method:
      return formatMethod(formatSyntaxTree)(config)(syntaxTree);
    case TokenType.String:
      return formatString(config)(syntaxTree);
    case TokenType.Word:
      return formatWord(config)(syntaxTree);
  }
};
