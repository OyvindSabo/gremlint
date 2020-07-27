const { assertEquals } = include('test/test.js');
const { formatQuery } = include('src/libs/gremlint/Gremlint.js');

const MaxLineLengthAssertions = [
  // When the maximum line length is equal to the length of the query, no line
  // wrapping should occur
  assertEquals(
    "g.V().hasLabel('person').where(outE('created').count().is(P.gte(2))).count()",
    formatQuery(
      "g.V().hasLabel('person').where(outE('created').count().is(P.gte(2))).count()",
      { indentation: 0, maxLineLength: 76 }
    )
  ),

  // A query of length 77 should be wrapped when the maximum line length is
  // set to 76
  assertEquals(
    `g.V().
  hasLabel('person').
  where(outE('created').count().is(P.gte(2))).
  count()`,
    formatQuery(
      "g.V().hasLabel('person').where(outE('created').count().is(P.gte(2))).count()",
      { indentation: 0, maxLineLength: 75 }
    )
  ),

  // When wrapping occurs, the parentheses, punctuations or commas after the
  // wrapped tokens should be included when considering whether to further
  // wrap the query. This doesn't currently work, as the following test shows
  assertEquals(
    `g.V().
  hasLabel('person').
  where(
    outE('created').count().is(P.gte(2))).
  count()`,
    formatQuery(
      "g.V().hasLabel('person').where(outE('created').count().is(P.gte(2))).count()",
      { indentation: 0, maxLineLength: 45 }
    )
  ),
];

module.exports = MaxLineLengthAssertions;
