import { formatSyntaxTrees } from './formatSyntaxTrees';
import { parseToSyntaxTrees } from './parseToSyntaxTrees';
import { recreateQueryStringFromFormattedSyntaxTrees } from './recreateQueryStringFromFormattedSyntaxTrees';
import { GremlintInternalConfig, GremlintUserConfig } from './types';
import { pipe } from './utils';

const withDefaults = (config: Partial<GremlintUserConfig>): GremlintUserConfig => ({
  indentation: 0,
  maxLineLength: 80,
  shouldPlaceDotsAfterLineBreaks: false,
  ...config,
});

const getInternalGremlintConfig = ({
  indentation,
  maxLineLength,
  shouldPlaceDotsAfterLineBreaks,
}: GremlintUserConfig): GremlintInternalConfig => ({
  globalIndentation: indentation,
  localIndentation: 0,
  maxLineLength: maxLineLength - indentation,
  shouldPlaceDotsAfterLineBreaks,
  shouldStartWithDot: false,
  shouldEndWithDot: false,
  horizontalPosition: 0,
});

export const formatQuery = (query: string, config?: Partial<GremlintUserConfig>): string => {
  const internalConfig = getInternalGremlintConfig(withDefaults(config ?? {}));
  return pipe(
    parseToSyntaxTrees,
    formatSyntaxTrees(internalConfig),
    recreateQueryStringFromFormattedSyntaxTrees(internalConfig),
  )(query);
};
