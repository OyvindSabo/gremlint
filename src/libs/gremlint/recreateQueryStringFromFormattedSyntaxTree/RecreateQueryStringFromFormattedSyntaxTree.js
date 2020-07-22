const { spaces } = include('src/libs/gremlint/utils.js');

const recreateQueryStringFromFormattedSyntaxTree = (syntaxTree) => {
  if (syntaxTree.type === 'traversal') {
    console.log('syntaxTree.stepGroups: ', syntaxTree.stepGroups);
    return syntaxTree.stepGroups
      .map((stepGroup) =>
        stepGroup.steps
          .map(recreateQueryStringFromFormattedSyntaxTree)
          .join('.')
      )
      .join('.\n');
  }
  if (syntaxTree.type === 'method') {
    return [
      recreateQueryStringFromFormattedSyntaxTree(syntaxTree.method) + '(',
      syntaxTree.argumentGroups
        .map((arguments) =>
          arguments.map(recreateQueryStringFromFormattedSyntaxTree).join(', ')
        )
        .join(syntaxTree.argumentGroups.length > 1 ? ',\n' : ', ') + ')',
    ].join(syntaxTree.argumentGroups.length > 1 ? '\n' : '');
  }
  if (syntaxTree.type === 'string') {
    return spaces(syntaxTree.indentation) + syntaxTree.string;
  }
  if (syntaxTree.type === 'word') {
    return spaces(syntaxTree.indentation) + syntaxTree.word;
  }
};

module.exports = {
  recreateQueryStringFromFormattedSyntaxTree,
};
