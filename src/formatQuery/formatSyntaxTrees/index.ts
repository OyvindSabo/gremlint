import { FormattedSyntaxTree, GremlintInternalConfig, TokenType, UnformattedSyntaxTree } from '../types';
import { formatClosure } from './formatClosure';
import { formatMethod } from './formatMethod';
import { formatNonGremlin } from './formatNonGremlin';
import { formatString } from './formatString';
import { formatTraversal } from './formatTraversal';
import { formatWord } from './formatWord';

const formatSyntaxTree = (config: GremlintInternalConfig) => (
  syntaxTree: UnformattedSyntaxTree,
): FormattedSyntaxTree => {
  switch (syntaxTree.type) {
    case TokenType.NonGremlinCode:
      return formatNonGremlin(config)(syntaxTree);
    case TokenType.Traversal:
      return formatTraversal(formatSyntaxTree)(config)(syntaxTree);
    case TokenType.Method:
      return formatMethod(formatSyntaxTree)(config)(syntaxTree);
    case TokenType.Closure:
      return formatClosure(formatSyntaxTree)(config)(syntaxTree);
    case TokenType.String:
      return formatString(config)(syntaxTree);
    case TokenType.Word:
      return formatWord(config)(syntaxTree);
  }
};

export const formatSyntaxTrees = (config: GremlintInternalConfig) => (syntaxTrees: UnformattedSyntaxTree[]) => {
  return syntaxTrees.map(formatSyntaxTree(config));
};
