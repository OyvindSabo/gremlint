const { pipe } = include('src/libs/simpleFP/SimpleFP.js');
const { parseToSyntaxTree } = include(
  'src/libs/gremlint/parseToSyntaxTree/ParseToSyntaxTree.js'
);
const { formatSyntaxTree } = include(
  'src/libs/gremlint/formatSyntaxTree/FormatSyntaxTree.js'
);
const { recreateQueryFromSyntaxTree } = include(
  'src/libs/gremlint/recreateQueryFromSyntaxTree/RecreateQueryFromSyntaxTree.js'
);

const formatQuery = (query, config = { maxLineLength: 80 }) =>
  pipe(
    parseToSyntaxTree,
    formatSyntaxTree(config),
    recreateQueryFromSyntaxTree
  )(query);

module.exports = {
  formatQuery,
};
