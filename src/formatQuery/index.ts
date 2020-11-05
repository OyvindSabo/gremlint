import { formatSyntaxTrees } from './formatSyntaxTree';
import { parseToSyntaxTrees } from './parseToSyntaxTree';
import { recreateQueryStringFromFormattedSyntaxTrees } from './recreateQueryStringFromFormattedSyntaxTree';
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
    parseToSyntaxTrees,
    formatSyntaxTrees(withDefaults(config ?? {})),
    recreateQueryStringFromFormattedSyntaxTrees,
  )(query);
};
