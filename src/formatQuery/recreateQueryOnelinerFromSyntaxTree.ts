import {
  TokenType,
  UnformattedClosureSyntaxTree,
  UnformattedMethodSyntaxTree,
  UnformattedStringSyntaxTree,
  UnformattedTraversalSyntaxTree,
  UnformattedWordSyntaxTree,
} from './types';
import { spaces } from './utils';

type GremlinOnelinerSyntaxTree =
  | Pick<UnformattedTraversalSyntaxTree, 'type' | 'steps'>
  | Pick<UnformattedMethodSyntaxTree, 'type' | 'method' | 'arguments'>
  | Pick<UnformattedClosureSyntaxTree, 'type' | 'method' | 'closureCodeBlock'>
  | Pick<UnformattedStringSyntaxTree, 'type' | 'string'>
  | Pick<UnformattedWordSyntaxTree, 'type' | 'word'>;

const recreateQueryOnelinerFromSyntaxTree = (indentation: number = 0) => (
  syntaxTree: GremlinOnelinerSyntaxTree,
): string => {
  switch (syntaxTree.type) {
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
        syntaxTree.closureCodeBlock +
        ')'
      );
    case TokenType.String:
      return spaces(indentation) + syntaxTree.string;
    case TokenType.Word:
      return spaces(indentation) + syntaxTree.word;
  }
};

export default recreateQueryOnelinerFromSyntaxTree;
