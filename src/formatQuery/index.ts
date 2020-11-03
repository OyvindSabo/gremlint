import { formatSyntaxTree } from './formatSyntaxTree';
import { parseToSyntaxTree } from './parseToSyntaxTree';
import { recreateQueryStringFromFormattedSyntaxTree } from './recreateQueryStringFromFormattedSyntaxTree';
import { GremlintConfig } from './types';
import { pipe } from './utils';

export const formatQuery = (
  query: string,
  { indentation = 0, maxLineLength = 80, shouldPlaceDotsAfterLineBreaks = false }: GremlintConfig,
): string => {
  return pipe(
    parseToSyntaxTree,
    formatSyntaxTree({ indentation, maxLineLength, shouldPlaceDotsAfterLineBreaks }),
    recreateQueryStringFromFormattedSyntaxTree,
  )(query);
};
