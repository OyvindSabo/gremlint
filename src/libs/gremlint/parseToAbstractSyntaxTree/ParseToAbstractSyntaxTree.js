const { pipe } = include('src/libs/simpleFP/SimpleFP.js');

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
          ? ' '
          : String.fromCharCode(28);
      return;
    }
    word += char;
  });
  return word.split(String.fromCharCode(28)).filter((token) => token !== '');
};

const tokenize = pipe(tokenizeOnTopLevelPunctuation);

const parseToAbstractSyntaxTree = (query) => {
  return query;
};

module.exports = {
  parseToAbstractSyntaxTree,
};

console.log(
  'tokenizeOnTopLevelPunctuation: ',
  tokenizeOnTopLevelPunctuation(`
    g.V().
      hasLabel('Application').
      has('name', 'Gremlint')`)
);

console.log(
  'tokenize: ',
  tokenize(`
    g.V().
      hasLabel('Application').
      has('name', 'Gremlint')`)
);
