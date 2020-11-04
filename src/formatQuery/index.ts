import { formatSyntaxTree } from './formatSyntaxTree';
import { parseToSyntaxTree } from './parseToSyntaxTree';
import { recreateQueryStringFromFormattedSyntaxTree } from './recreateQueryStringFromFormattedSyntaxTree';
import { GremlintConfig } from './types';
import { pipe } from './utils';

const withDefaults = (config: Partial<GremlintConfig>) => ({
  indentation: 0,
  maxLineLength: 80,
  shouldPlaceDotsAfterLineBreaks: false,
  ...config,
});

export const formatQuery = (query: string, config?: Partial<GremlintConfig>): string => {
  return pipe(
    parseToSyntaxTree,
    formatSyntaxTree(withDefaults(config ?? {})),
    recreateQueryStringFromFormattedSyntaxTree,
  )(query);
};
