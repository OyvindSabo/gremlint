const recreateQueryFromSyntaxTree = (syntaxTree) => {
  if (syntaxTree.type === 'traversal') {
    return syntaxTree.steps
      .map((step, index, steps) => {
        const nextStep = steps[index + 1];
        if (nextStep === undefined) return recreateQueryFromSyntaxTree(step);
        return (
          recreateQueryFromSyntaxTree(step) +
          (nextStep.shouldBeNewlined ? '.\n' : '.')
        );
      })
      .join('');
  }
  if (syntaxTree.type === 'method') {
    return (
      recreateQueryFromSyntaxTree(syntaxTree.method) +
      '(' +
      syntaxTree.arguments.map((argument, index, arguments) => {
        const nextArgument = arguments[index + 1];
        if (nextArgument === undefined) {
          return recreateQueryFromSyntaxTree(argument);
        }
        return (
          recreateQueryFromSyntaxTree(argument) +
          (nextArgument.shouldBeNewlined ? ',\n' : ',')
        );
      }) +
      ')'
    );
  }
  if (syntaxTree.type === 'string') {
    return syntaxTree.string + (syntaxTree.shouldBeNewlined ? '\n' : '');
  }
  if (syntaxTree.type === 'word') {
    return syntaxTree.word + (syntaxTree.shouldBeNewlined ? '\n' : '');
  }
  console.log('syntaxTree: ', syntaxTree);
};

module.exports = {
  recreateQueryFromSyntaxTree,
};
