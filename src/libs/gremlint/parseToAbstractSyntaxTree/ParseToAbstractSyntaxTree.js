const { last, pipe } = include('src/libs/simpleFP/SimpleFP.js');

const tokenizeOnTopLevelPunctuation = (query) => {
  word = '';
  parenthesesCount = 0;
  squareBracketCount = 0;
  curlyBracketCount = 0;
  isInsideSingleQuoteString = false;
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
      isInsideString = !isInsideSingleQuoteString;
      word += "'";
      return;
    }
    if (char === '.') {
      word +=
        isInsideSingleQuoteString ||
        parenthesesCount ||
        squareBracketCount ||
        curlyBracketCount
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

const tokenizeOnTopLevelComma = (query) => {
  word = '';
  parenthesesCount = 0;
  squareBracketCount = 0;
  curlyBracketCount = 0;
  isInsideSingleQuoteString = false;
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
      isInsideString = !isInsideSingleQuoteString;
      word += "'";
      return;
    }
    if (char === ',') {
      word +=
        isInsideSingleQuoteString ||
        parenthesesCount ||
        squareBracketCount ||
        curlyBracketCount
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

const tokenizeOnTopLevelParentheses = (query) => {
  word = '';
  parenthesesCount = 0;
  squareBracketCount = 0;
  curlyBracketCount = 0;
  isInsideSingleQuoteString = false;
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
      isInsideString = !isInsideSingleQuoteString;
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

const isWrappedInParentheses = (token) => {
  if (token.length < 2) return false;
  if (token.charAt(0) !== '(') return false;
  if (token.slice(-1) !== ')') return false;
  return true;
};

const isString = (token) => {
  if (token.length < 2) return false;
  if (token.charAt(0) !== token.substr(-1)) return false;
  if (['"', "'"].includes(token.charAt(0))) return true;
  return false;
};

const isMethodInvocation = (token) => {
  return pipe(
    tokenizeOnTopLevelParentheses,
    last,
    isWrappedInParentheses
  )(token);
};

const trimParentheses = (expression) => expression.slice(1, -1);

const getMethodTokenAndArgumentTokensFromMethodInvocation = (token) => {
  // The word before the first parenthesis is the method name
  // The token may be a double application of a curried function, so we cannot
  // assume that the first opening parenthesis is closed by the last closing
  // parenthesis
  const tokens = tokenizeOnTopLevelParentheses(token);
  return {
    methodToken: tokens.slice(0, -1).join(''),
    argumentTokens: pipe(
      trimParentheses,
      tokenizeOnTopLevelComma
    )(tokens.slice(-1)[0]),
  };
};

const tokenize = pipe(tokenizeOnTopLevelPunctuation);

const parseToAbstractSyntaxTree = (query) => {
  const tokens = tokenizeOnTopLevelPunctuation(query);
  if (tokens.length === 1) {
    const token = tokens[0];
    if (isMethodInvocation(token)) {
      const {
        methodToken,
        argumentTokens,
      } = getMethodTokenAndArgumentTokensFromMethodInvocation(token);
      return {
        type: 'method',
        method: parseToAbstractSyntaxTree(methodToken),
        arguments: argumentTokens.map(parseToAbstractSyntaxTree),
      };
    }
    if (isString(token)) {
      return {
        type: 'string',
        string: token,
      };
    }
    return {
      type: 'word',
      word: token,
    };
  }
  return {
    steps: tokens.map(parseToAbstractSyntaxTree),
  };
};

module.exports = {
  parseToAbstractSyntaxTree,
};

/*
console.log(
  'tokenizeOnTopLevelPunctuation: ',
  tokenizeOnTopLevelPunctuation(`
    g.V().
      filter(
        out().
        hasLabel('Application').
        has('name', 'Gremlint'))`)
);

console.log(
  'tokenize: ',
  tokenize(`
    g.V().
      filter(
        out().
        hasLabel('Application').
        has('name', 'Gremlint'))`)
);
*/

console.log(
  'parseToAbstractSyntaxTree: ',
  JSON.stringify(
    parseToAbstractSyntaxTree(`
    g.V().
      filter(
        out().
        hasLabel('Application').
        has('name', 'Gremlint'))`),
    null,
    2
  )
);
