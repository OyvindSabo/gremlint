import { formatQuery } from '..';

test('It should be possible ot use formatQuery with a config, with a partial config and no config', () => {
  // Test using formatQuery with a default config
  expect(
    formatQuery(
      "g.V().has('person', 'name', 'marko').shortestPath().with(ShortestPath.target, __.has('name', 'josh')).with(ShortestPath.distance, 'weight')",
      {
        indentation: 0,
        maxLineLength: 80,
        shouldPlaceDotsAfterLineBreaks: false,
      },
    ),
  ).toBe(`g.V().
  has('person', 'name', 'marko').
  shortestPath().
    with(ShortestPath.target, __.has('name', 'josh')).
    with(ShortestPath.distance, 'weight')`);

  // Test using formatQuery with a non-default confi
  expect(
    formatQuery(
      "g.V().has('person', 'name', 'marko').shortestPath().with(ShortestPath.target, __.has('name', 'josh')).with(ShortestPath.distance, 'weight')",
      {
        indentation: 8,
        maxLineLength: 50,
        shouldPlaceDotsAfterLineBreaks: true,
      },
    ),
  ).toBe(`        g.V()
          .has('person', 'name', 'marko')
          .shortestPath()
            .with(
              ShortestPath.target,
              __.has('name', 'josh'))
            .with(ShortestPath.distance, 'weight')`);

  // Test using formatQuery with an empty config
  expect(
    formatQuery(
      "g.V().has('person', 'name', 'marko').shortestPath().with(ShortestPath.target, __.has('name', 'josh')).with(ShortestPath.distance, 'weight')",
      {},
    ),
  ).toBe(`g.V().
  has('person', 'name', 'marko').
  shortestPath().
    with(ShortestPath.target, __.has('name', 'josh')).
    with(ShortestPath.distance, 'weight')`);

  // Test using formatQuery without a config
  expect(
    formatQuery(
      "g.V().has('person', 'name', 'marko').shortestPath().with(ShortestPath.target, __.has('name', 'josh')).with(ShortestPath.distance, 'weight')",
    ),
  ).toBe(`g.V().
  has('person', 'name', 'marko').
  shortestPath().
    with(ShortestPath.target, __.has('name', 'josh')).
    with(ShortestPath.distance, 'weight')`);
});
