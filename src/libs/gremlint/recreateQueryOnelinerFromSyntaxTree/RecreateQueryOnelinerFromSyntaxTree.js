const { spaces } = require('../../../libs/gremlint/utils.js');

const recreateQueryOnelinerFromSyntaxTree = (indentation = 0) => (
  syntaxTree
) => {
  switch (syntaxTree.type) {
    case 'traversal':
      return (
        spaces(indentation) +
        syntaxTree.steps.map(recreateQueryOnelinerFromSyntaxTree()).join('.')
      );
    case 'method':
      return (
        spaces(indentation) +
        recreateQueryOnelinerFromSyntaxTree()(syntaxTree.method) +
        '(' +
        syntaxTree.arguments
          .map(recreateQueryOnelinerFromSyntaxTree())
          .join(', ') +
        ')'
      );
    case 'string':
      return spaces(indentation) + syntaxTree.string;
    case 'word':
      return spaces(indentation) + syntaxTree.word;
  }
};

module.exports = {
  recreateQueryOnelinerFromSyntaxTree,
};
