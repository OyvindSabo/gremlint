const { runTests, test, assertEquals } = include('test/test.js');

runTests(
  test(
    'Queries with less than 80 characters should be formatted to a single line',
    assertEquals(
      `g.V().hasLabel('Application')`,
      `g.V().hasLabel('Application')`
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
