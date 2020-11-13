import {
  FormattedNonGremlinSyntaxTree,
  FormattedWordSyntaxTree,
  GremlintInternalConfig,
  TokenType,
  UnformattedNonGremlinSyntaxTree,
  UnformattedWordSyntaxTree,
} from '../types';
import { last } from '../utils';

export const formatNonGremlin = (config: GremlintInternalConfig) => (
  syntaxTree: UnformattedNonGremlinSyntaxTree,
): FormattedNonGremlinSyntaxTree => {
  return {
    ...syntaxTree,
    width: last(syntaxTree.code.split('\n')).length,
  };
};
