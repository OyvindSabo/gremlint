import {
  FormattedNonGremlinSyntaxTree,
  FormattedWordSyntaxTree,
  GremlintConfig,
  TokenType,
  UnformattedNonGremlinSyntaxTree,
  UnformattedWordSyntaxTree,
} from '../types';
import { last } from '../utils';

export const formatNonGremlin = (config: GremlintConfig) => (
  syntaxTree: UnformattedNonGremlinSyntaxTree,
): FormattedNonGremlinSyntaxTree => {
  return {
    ...syntaxTree,
    width: last(syntaxTree.code.split('\n')).length,
  };
};
