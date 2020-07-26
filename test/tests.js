const { runTests, test, assertEquals } = include('test/test.js');
const { formatQuery } = include('src/libs/gremlint/Gremlint.js');

runTests(
  test(
    'No line in the query should exceed the maximum line length',
    assertEquals(
      formatQuery(
        "g.V().hasLabel('person').where(outE('created').count().is(P.gte(2))).count()",
        { indentation: 0, maxLineLength: 45 }
      ),
      `g.V().
  hasLabel('person').
  where(
    outE("created").count().is(P.gte(2))).
  count()`
    )
  ),
  test(
    'Queries with less than 80 characters should be formatted to a single line',
    assertEquals(
      `g.V().hasLabel('Application')`,
      `g.V().hasLabel('Application')`
    ),
    assertEquals(
      `g.V().hasLabel('Application')`,
      `g.V().hasLabel('Application')`
    ),
    assertEquals(
      `g.V() .hasLabel('Application')`,
      `g.V().hasLabel('Application')`
    )
  )
);
