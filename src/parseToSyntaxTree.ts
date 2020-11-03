import { TokenType, UnformattedSyntaxTree } from './types';
import { last, pipe } from './utils';

const tokenizeOnTopLevelPunctuation = (query: string): string[] => {
  let word = '';
  let parenthesesCount = 0;
  let squareBracketCount = 0;
  let curlyBracketCount = 0;
  let isInsideSingleQuoteString = false;
  query.split('').forEach((char) => {
    if (char === '(' && !isInsideSingleQuoteString) {
      parenthesesCount++;
      word += '(';
      return;
    }
    if (char === '[' && !isInsideSingleQuoteString) {
      squareBracketCount++;
      word += '[';
      return;
    }
    if (char === '{' && !isInsideSingleQuoteString) {
      curlyBracketCount++;
      word += '{';
      return;
    }
    if (char === ')' && !isInsideSingleQuoteString) {
      parenthesesCount--;
      word += ')';
      return;
    }
    if (char === ']' && !isInsideSingleQuoteString) {
      squareBracketCount--;
      word += ']';
      return;
    }
    if (char === '}' && !isInsideSingleQuoteString) {
      curlyBracketCount--;
      word += '}';
      return;
    }
    if (char === "'") {
      isInsideSingleQuoteString = !isInsideSingleQuoteString;
      word += "'";
      return;
    }
    if (char === '.') {
      word +=
        isInsideSingleQuoteString || parenthesesCount || squareBracketCount || curlyBracketCount
          ? '.'
          : String.fromCharCode(28);
      return;
    }
    word += char;
  });
  return word
    .split(String.fromCharCode(28))
    .filter((token) => token !== '')
    .map((token) => token.trim());
};

const tokenizeOnTopLevelComma = (query: string): string[] => {
  let word = '';
  let parenthesesCount = 0;
  let squareBracketCount = 0;
  let curlyBracketCount = 0;
  let isInsideSingleQuoteString = false;
  query.split('').forEach((char) => {
    if (char === '(' && !isInsideSingleQuoteString) {
      parenthesesCount++;
      word += '(';
      return;
    }
    if (char === '[' && !isInsideSingleQuoteString) {
      squareBracketCount++;
      word += '[';
      return;
    }
    if (char === '{' && !isInsideSingleQuoteString) {
      curlyBracketCount++;
      word += '{';
      return;
    }
    if (char === ')' && !isInsideSingleQuoteString) {
      parenthesesCount--;
      word += ')';
      return;
    }
    if (char === ']' && !isInsideSingleQuoteString) {
      squareBracketCount--;
      word += ']';
      return;
    }
    if (char === '}' && !isInsideSingleQuoteString) {
      curlyBracketCount--;
      word += '}';
      return;
    }
    if (char === "'") {
      isInsideSingleQuoteString = !isInsideSingleQuoteString;
      word += "'";
      return;
    }
    if (char === ',') {
      word +=
        isInsideSingleQuoteString || parenthesesCount || squareBracketCount || curlyBracketCount
          ? ','
          : String.fromCharCode(28);
      return;
    }
    word += char;
  });
  return word
    .split(String.fromCharCode(28))
    .filter((token) => token !== '')
    .map((token) => token.trim());
};

const tokenizeOnTopLevelParentheses = (query: string): string[] => {
  let word = '';
  let parenthesesCount = 0;
  let squareBracketCount = 0;
  let curlyBracketCount = 0;
  let isInsideSingleQuoteString = false;
  query.split('').forEach((char) => {
    if (char === '(' && !isInsideSingleQuoteString) {
      if (parenthesesCount === 0) {
        word += String.fromCharCode(28);
      }
      parenthesesCount++;
      word += '(';
      return;
    }
    if (char === '[' && !isInsideSingleQuoteString) {
      squareBracketCount++;
      word += '[';
      return;
    }
    if (char === '{' && !isInsideSingleQuoteString) {
      curlyBracketCount++;
      word += '{';
      return;
    }
    if (char === ')' && !isInsideSingleQuoteString) {
      parenthesesCount--;
      word += ')';
      return;
    }
    if (char === ']' && !isInsideSingleQuoteString) {
      squareBracketCount--;
      word += ']';
      return;
    }
    if (char === '}' && !isInsideSingleQuoteString) {
      curlyBracketCount--;
      word += '}';
      return;
    }
    if (char === "'") {
      isInsideSingleQuoteString = !isInsideSingleQuoteString;
      word += "'";
      return;
    }
    word += char;
  });
  return word
    .split(String.fromCharCode(28))
    .filter((token) => token !== '')
    .map((token) => token.trim());
};

const isWrappedInParentheses = (token: string): boolean => {
  if (token.length < 2) return false;
  if (token.charAt(0) !== '(') return false;
  if (token.slice(-1) !== ')') return false;
  return true;
};

const isString = (token: string): boolean => {
  if (token.length < 2) return false;
  if (token.charAt(0) !== token.substr(-1)) return false;
  if (['"', "'"].includes(token.charAt(0))) return true;
  return false;
};

const isMethodInvocation = (token: string): boolean => {
  return pipe(tokenizeOnTopLevelParentheses, last, isWrappedInParentheses)(token);
};

const trimParentheses = (expression: string): string => expression.slice(1, -1);

const getMethodTokenAndArgumentTokensFromMethodInvocation = (
  token: string,
): { methodToken: string; argumentTokens: string[] } => {
  // The word before the first parenthesis is the method name
  // The token may be a double application of a curried function, so we cannot
  // assume that the first opening parenthesis is closed by the last closing
  // parenthesis
  const tokens = tokenizeOnTopLevelParentheses(token);
  return {
    methodToken: tokens.slice(0, -1).join(''),
    argumentTokens: pipe(trimParentheses, tokenizeOnTopLevelComma)(tokens.slice(-1)[0]),
  };
};

export const parseToSyntaxTree = (query: string): UnformattedSyntaxTree => {
  const tokens = tokenizeOnTopLevelPunctuation(query);
  if (tokens.length === 1) {
    const token = tokens[0];
    if (isMethodInvocation(token)) {
      const { methodToken, argumentTokens } = getMethodTokenAndArgumentTokensFromMethodInvocation(token);
      return {
        type: TokenType.Method,
        method: parseToSyntaxTree(methodToken),
        arguments: argumentTokens.map(parseToSyntaxTree),
      };
    }
    if (isString(token)) {
      return {
        type: TokenType.String,
        string: token,
      };
    }
    return {
      type: TokenType.Word,
      word: token,
    };
  }
  return {
    type: TokenType.Traversal,
    steps: tokens.map(parseToSyntaxTree),
  };
};
