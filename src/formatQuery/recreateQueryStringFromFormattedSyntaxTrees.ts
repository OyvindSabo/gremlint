import { FormattedSyntaxTree, TokenType } from './types';
import { spaces } from './utils';

const recreateQueryStringFromFormattedSyntaxTree = (syntaxTree: FormattedSyntaxTree): string => {
  if (syntaxTree.type === TokenType.NonGremlinCode) {
    return syntaxTree.code;
  }
  if (syntaxTree.type === TokenType.Traversal) {
    return syntaxTree.stepGroups
      .map((stepGroup) => stepGroup.steps.map(recreateQueryStringFromFormattedSyntaxTree).join('.'))
      .join('\n');
  }
  if (syntaxTree.type === TokenType.Method) {
    return (
      (syntaxTree.shouldStartWithDot ? '.' : '') +
      [
        recreateQueryStringFromFormattedSyntaxTree(syntaxTree.method) + '(',
        syntaxTree.argumentGroups
          .map((args) => args.map(recreateQueryStringFromFormattedSyntaxTree).join(', '))
          .join(',\n') +
          ')' +
          (syntaxTree.shouldEndWithDot ? '.' : ''),
      ].join(syntaxTree.argumentsShouldStartOnNewLine ? '\n' : '')
    );
  }
  if (syntaxTree.type === TokenType.Closure) {
    return (
      (syntaxTree.shouldStartWithDot ? '.' : '') +
      recreateQueryStringFromFormattedSyntaxTree(syntaxTree.method) +
      '{' +
      syntaxTree.closureCodeBlock
        .map(({ lineOfCode, indentation }, i) => `${spaces(indentation)}${lineOfCode}`)
        .join('\n') +
      '}' +
      (syntaxTree.shouldEndWithDot ? '.' : '')
    );
  }
  if (syntaxTree.type === TokenType.String) {
    return spaces(syntaxTree.indentation) + syntaxTree.string;
  }
  if (syntaxTree.type === TokenType.Word) {
    return (
      spaces(syntaxTree.indentation) +
      (syntaxTree.shouldStartWithDot ? '.' : '') +
      syntaxTree.word +
      (syntaxTree.shouldEndWithDot ? '.' : '')
    );
  }
  // The following line is just here to convince TypeScript that the return type
  // is string and not string | undefined.
  return '';
};

export const recreateQueryStringFromFormattedSyntaxTrees = (syntaxTrees: FormattedSyntaxTree[]) => {
  return syntaxTrees.map(recreateQueryStringFromFormattedSyntaxTree).join('');
};