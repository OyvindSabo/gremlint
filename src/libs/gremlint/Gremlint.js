const { pipe } = include('src/libs/simpleFP/SimpleFP.js');
const { parseToAbstractSyntaxTree } = include(
  'src/libs/gremlint/parseToAbstractSyntaxTree/ParseToAbstractSyntaxTree.js'
);

const formatQuery = (query, config = { maxLineLength: 80 }) =>
  pipe(parseToAbstractSyntaxTree, (obj) => JSON.stringify(obj, null, 2))(query);

module.exports = {
  formatQuery,
};
