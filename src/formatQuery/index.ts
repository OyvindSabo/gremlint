import { formatSyntaxTrees } from './formatSyntaxTrees';
import { parseToSyntaxTrees } from './parseToSyntaxTrees';
import { recreateQueryStringFromFormattedSyntaxTrees } from './recreateQueryStringFromFormattedSyntaxTrees';
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
