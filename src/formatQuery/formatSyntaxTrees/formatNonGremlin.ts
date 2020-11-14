import { FormattedNonGremlinSyntaxTree, GremlintInternalConfig, UnformattedNonGremlinSyntaxTree } from '../types';
import { count, last } from '../utils';

export const formatNonGremlin = (_config: GremlintInternalConfig) => (
  syntaxTree: UnformattedNonGremlinSyntaxTree,
): FormattedNonGremlinSyntaxTree => {
  return {
    ...syntaxTree,
    width: count(last(syntaxTree.code.split('\n'))),
  };
};
