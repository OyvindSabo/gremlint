const { test, assertEquals } = include('test/test.js');

test(
  'Queries with less than 80 characters should be formatted to a single line',
  assertEquals(
    `g.V().\nhasLabel('Application')`,
    `g.V().hasLabel('Application')`
  )
);
