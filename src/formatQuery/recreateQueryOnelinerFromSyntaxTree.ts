import {
  FormattedMethodSyntaxTree,
  TokenType,
  UnformattedClosureSyntaxTree,
  UnformattedMethodSyntaxTree,
  UnformattedNonGremlinSyntaxTree,
  UnformattedStringSyntaxTree,
  UnformattedTraversalSyntaxTree,
  UnformattedWordSyntaxTree,
} from './types';
import { last, spaces } from './utils';

type GremlinOnelinerSyntaxTree =
  | UnformattedNonGremlinSyntaxTree
  | Pick<UnformattedTraversalSyntaxTree, 'type' | 'steps'>
  | Pick<UnformattedMethodSyntaxTree, 'type' | 'method' | 'arguments'>
  | Pick<UnformattedClosureSyntaxTree, 'type' | 'method' | 'closureCodeBlock'>
  | Pick<UnformattedStringSyntaxTree, 'type' | 'string'>
  | Pick<UnformattedWordSyntaxTree, 'type' | 'word'>;

const recreateQueryOnelinerFromSyntaxTree = (indentation: number = 0) => (
  syntaxTree: GremlinOnelinerSyntaxTree,
): string => {
  switch (syntaxTree.type) {
    // This case will never occur
    case TokenType.NonGremlinCode:
      return syntaxTree.code;
    case TokenType.Traversal:
      return spaces(indentation) + syntaxTree.steps.map(recreateQueryOnelinerFromSyntaxTree()).join('.');
    case TokenType.Method:
      return (
        spaces(indentation) +
        recreateQueryOnelinerFromSyntaxTree()(syntaxTree.method) +
        '(' +
        syntaxTree.arguments.map(recreateQueryOnelinerFromSyntaxTree()).join(', ') +
        ')'
      );
    case TokenType.Closure:
      return (
        spaces(indentation) +
        recreateQueryOnelinerFromSyntaxTree()(syntaxTree.method) +
        '{' +
        last(
          syntaxTree.closureCodeBlock.map(
            ({ lineOfCode, relativeIndentation }) => `${spaces(Math.max(relativeIndentation, 0))}${lineOfCode}`,
          ),
        ) +
        '}'
      );
    case TokenType.String:
      return spaces(indentation) + syntaxTree.string;
    case TokenType.Word:
      return spaces(indentation) + syntaxTree.word;
  }
};

export default recreateQueryOnelinerFromSyntaxTree;
