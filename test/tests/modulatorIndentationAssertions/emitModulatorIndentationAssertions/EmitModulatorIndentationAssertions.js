const { assertEquals } = require('../../../test.js');
const { formatQuery } = require('../../../../src/libs/gremlint/Gremlint.js');

const EmitModulatorIndentationAssertions = [
  // If modulators have to be wrapped, they should be indented with two
  // additional spaces, but consecutive steps should not be indented with two
  // additional spaces.
  // Check that emit-steps are indented as modulators.
  assertEquals(
    `g.V(1).
  repeat(bothE('created').dedup().otherV()).
    emit().
  path()`,
    formatQuery(
      "g.V(1).repeat(bothE('created').dedup().otherV()).emit().path()",
      {
        indentation: 0,
        maxLineLength: 45,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),
  assertEquals(
    `g.V().
  repeat(both()).
    times(1000000).
    emit().
  range(6, 10)`,
    formatQuery('g.V().repeat(both()).times(1000000).emit().range(6,10)', {
      indentation: 0,
      maxLineLength: 35,
      shouldPlaceDotsAfterLineBreaks: false,
    })
  ),
  assertEquals(
    `g.V(1).
  repeat(out()).
    times(2).
    emit().
  path().by('name')`,
    formatQuery("g.V(1).repeat(out()).times(2).emit().path().by('name')", {
      indentation: 0,
      maxLineLength: 30,
      shouldPlaceDotsAfterLineBreaks: false,
    })
  ),

  assertEquals(
    `g.withSack(1).
  V(1).
  repeat(sack(sum).by(constant(1))).
    times(10).
    emit().
  sack().
  math('sin _')`,
    formatQuery(
      "g.withSack(1).V(1).repeat(sack(sum).by(constant(1))).times(10).emit().sack().math('sin _')",
      {
        indentation: 0,
        maxLineLength: 40,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),
];

module.exports = EmitModulatorIndentationAssertions;
