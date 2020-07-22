const { pipe } = include('src/libs/simpleFP/SimpleFP.js');
const { parseToSyntaxTree } = include(
  'src/libs/gremlint/parseToSyntaxTree/ParseToSyntaxTree.js'
);
const { formatSyntaxTree } = include(
  'src/libs/gremlint/formatSyntaxTree/FormatSyntaxTree.js'
);
const { recreateQueryStringFromFormattedSyntaxTree } = include(
  'src/libs/gremlint/recreateQueryStringFromFormattedSyntaxTree/RecreateQueryStringFromFormattedSyntaxTree.js'
);

const formatQuery = (query, config = { indentation: 0, maxLineLength: 80 }) =>
  pipe(
    parseToSyntaxTree,
    formatSyntaxTree(config),
    recreateQueryStringFromFormattedSyntaxTree
  )(query);

module.exports = {
  formatQuery,
};
