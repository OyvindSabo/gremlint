const {
  formatTraversal,
} = require('../../../libs/gremlint/formatSyntaxTree/formatTraversal/FormatTraversal.js');
const {
  formatMethod,
} = require('../../../libs/gremlint/formatSyntaxTree/formatMethod/FormatMethod.js');
const {
  formatString,
} = require('../../../libs/gremlint/formatSyntaxTree/formatString/FormatString.js');
const {
  formatWord,
} = require('../../../libs/gremlint/formatSyntaxTree/formatWord/FormatWord.js');

const formatSyntaxTree = (config) => (syntaxTree) => {
  switch (syntaxTree.type) {
    case 'traversal':
      return formatTraversal(formatSyntaxTree)(config)(syntaxTree);
    case 'method':
      return formatMethod(formatSyntaxTree)(config)(syntaxTree);
    case 'string':
      return formatString(config)(syntaxTree);
    case 'word':
      return formatWord(config)(syntaxTree);
  }
};

module.exports = { formatSyntaxTree };
