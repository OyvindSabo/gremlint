const { pipe } = include('src/libs/simpleFP/SimpleFP.js');

const formatQuery = (query, config = { maxLineLength: 80 }) => pipe()(query);

module.exports = {
  formatQuery,
};
