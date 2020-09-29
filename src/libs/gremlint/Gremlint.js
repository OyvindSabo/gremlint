const { pipe } = require('../simpleFP/SimpleFP.js');
const {
  parseToSyntaxTree,
} = require('./parseToSyntaxTree/ParseToSyntaxTree.js');
const { formatSyntaxTree } = require('./formatSyntaxTree/FormatSyntaxTree.js');
const {
  recreateQueryStringFromFormattedSyntaxTree,
} = require('./recreateQueryStringFromFormattedSyntaxTree/RecreateQueryStringFromFormattedSyntaxTree.js');

const formatQuery = (
  query,
  config = {
    indentation: 0,
    maxLineLength: 80,
    shouldPlaceDotsAfterLineBreaks: false,
  }
) => {
  return pipe(
    parseToSyntaxTree,
    formatSyntaxTree(config),
    recreateQueryStringFromFormattedSyntaxTree
  )(query);
};

module.exports = { formatQuery };
