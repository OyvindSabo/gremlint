import { formatQuery } from '..';

test('No line in the query should exceed the maximum line length', () => {
  // When the maximum line length is equal to the length of the query, no line wrapping should occur
  expect(
    formatQuery("g.V().hasLabel('person').where(outE('created').count().is(P.gte(2))).count()", {
      indentation: 0,
      maxLineLength: 76,
      shouldPlaceDotsAfterLineBreaks: false,
    }),
  ).toBe("g.V().hasLabel('person').where(outE('created').count().is(P.gte(2))).count()");

  // A query of length 77 should be wrapped when the maximum line length is set to 76
  expect(
    formatQuery("g.V().hasLabel('person').where(outE('created').count().is(P.gte(2))).count()", {
      indentation: 0,
      maxLineLength: 75,
      shouldPlaceDotsAfterLineBreaks: false,
    }),
  ).toBe(`g.V().
  hasLabel('person').
  where(outE('created').count().is(P.gte(2))).
  count()`);

  // When wrapping occurs, the parentheses, punctuations or commas after the wrapped tokens should be included when
  // considering whether to further wrap the query. This doesn't currently work, as the following test shows
  // https://github.com/OyvindSabo/gremlint/issues/44
  /*expect(
    formatQuery("g.V().hasLabel('person').where(outE('created').count().is(P.gte(2))).count()", {
      indentation: 0,
      maxLineLength: 45,
      shouldPlaceDotsAfterLineBreaks: false,
    }),
  ).toBe(`g.V().
  hasLabel('person').
  where(
    outE('created').count().is(P.gte(2))).
  count()`);*/
});
