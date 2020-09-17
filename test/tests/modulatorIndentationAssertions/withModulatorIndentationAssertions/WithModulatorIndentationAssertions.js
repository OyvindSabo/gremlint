const { assertEquals } = require('../../../test.js');
const { formatQuery } = require('../../../../src/libs/gremlint/Gremlint.js');

const WithModulatorIndentationAssertions = [
  // If modulators have to be wrapped, they should be indented with two
  // additional spaces, but consecutive steps should not be indented with two
  // additional spaces.
  // Check that with_-steps are indented as modulators.
  assertEquals(
    `g.V().
  connectedComponent().
    with(ConnectedComponent.propertyName, 'component').
  project('name', 'component').
    by('name').
    by('component')`,
    formatQuery(
      "g.V().connectedComponent().with(ConnectedComponent.propertyName, 'component').project('name','component').by('name').by('component')",
      { indentation: 0, maxLineLength: 55, shouldPlaceDotsAfterNewlines: false }
    )
  ),
  assertEquals(
    `g.V().
  hasLabel('person').
  connectedComponent().
    with(ConnectedComponent.propertyName, 'component').
    with(ConnectedComponent.edges, outE('knows')).
  project('name', 'component').
    by('name').
    by('component')`,
    formatQuery(
      "g.V().hasLabel('person').connectedComponent().with(ConnectedComponent.propertyName, 'component').with(ConnectedComponent.edges, outE('knows')).project('name','component').by('name').by('component')",
      { indentation: 0, maxLineLength: 55, shouldPlaceDotsAfterNewlines: false }
    )
  ),
  assertEquals(
    `g.V().
  hasLabel('software').
  values('name').
  fold().
  order(Scope.local).
  index().
    with(WithOptions.indexer, WithOptions.list).
  unfold().
  order().by(__.tail(Scope.local, 1))`,
    formatQuery(
      "g.V().hasLabel('software').values('name').fold().order(Scope.local).index().with(WithOptions.indexer, WithOptions.list).unfold().order().by(__.tail(Scope.local, 1))",
      { indentation: 0, maxLineLength: 50, shouldPlaceDotsAfterNewlines: false }
    )
  ),
  assertEquals(
    `g.V().
  hasLabel('person').
  values('name').
  fold().
  order(Scope.local).
  index().
    with(WithOptions.indexer, WithOptions.map)`,
    formatQuery(
      "g.V().hasLabel('person').values('name').fold().order(Scope.local).index().with(WithOptions.indexer, WithOptions.map)",
      { indentation: 0, maxLineLength: 50, shouldPlaceDotsAfterNewlines: false }
    )
  ),
  assertEquals(
    `g.io(someInputFile).
    with(IO.reader, IO.graphson).
    read().
  iterate()`,
    formatQuery(
      'g.io(someInputFile).with(IO.reader, IO.graphson).read().iterate()',
      { indentation: 0, maxLineLength: 35, shouldPlaceDotsAfterNewlines: false }
    )
  ),
  assertEquals(
    `g.io(someOutputFile).
    with(IO.writer, IO.graphml).
    write().
  iterate()`,
    formatQuery(
      'g.io(someOutputFile).with(IO.writer,IO.graphml).write().iterate()',
      { indentation: 0, maxLineLength: 35, shouldPlaceDotsAfterNewlines: false }
    )
  ),
  assertEquals(
    `g.V().
  hasLabel('person').
  pageRank().
    with(PageRank.edges, __.outE('knows')).
    with(PageRank.propertyName, 'friendRank').
  order().by('friendRank', desc).
  elementMap('name', 'friendRank')`,
    formatQuery(
      "g.V().hasLabel('person').pageRank().with(PageRank.edges, __.outE('knows')).with(PageRank.propertyName, 'friendRank').order().by('friendRank',desc).elementMap('name','friendRank')",
      { indentation: 0, maxLineLength: 50, shouldPlaceDotsAfterNewlines: false }
    )
  ),
  assertEquals(
    `g.V().
  hasLabel('person').
  peerPressure().
    with(PeerPressure.propertyName, 'cluster').
  group().by('cluster').by('name')`,
    formatQuery(
      "g.V().hasLabel('person').peerPressure().with(PeerPressure.propertyName, 'cluster').group().by('cluster').by('name')",
      { indentation: 0, maxLineLength: 50, shouldPlaceDotsAfterNewlines: false }
    )
  ),
  assertEquals(
    `g.V().
  shortestPath().
    with(ShortestPath.target, __.has('name', 'peter'))`,
    formatQuery(
      "g.V().shortestPath().with(ShortestPath.target, __.has('name','peter'))",
      { indentation: 0, maxLineLength: 55, shouldPlaceDotsAfterNewlines: false }
    )
  ),
  assertEquals(
    `g.V().
  shortestPath().
    with(ShortestPath.edges, Direction.IN).
    with(ShortestPath.target, __.has('name', 'josh'))`,
    formatQuery(
      "g.V().shortestPath().with(ShortestPath.edges, Direction.IN).with(ShortestPath.target, __.has('name','josh'))",
      { indentation: 0, maxLineLength: 55, shouldPlaceDotsAfterNewlines: false }
    )
  ),
  assertEquals(
    `g.V().
  has('person', 'name', 'marko').
  shortestPath().
    with(ShortestPath.target, __.has('name', 'josh'))`,
    formatQuery(
      "g.V().has('person','name','marko').shortestPath().with(ShortestPath.target,__.has('name','josh'))",
      { indentation: 0, maxLineLength: 55, shouldPlaceDotsAfterNewlines: false }
    )
  ),
  assertEquals(
    `g.V().
  has('person', 'name', 'marko').
  shortestPath().
    with(ShortestPath.target, __.has('name', 'josh')).
    with(ShortestPath.distance, 'weight')`,
    formatQuery(
      "g.V().has('person','name','marko').shortestPath().with(ShortestPath.target, __.has('name','josh')).with(ShortestPath.distance, 'weight')",
      { indentation: 0, maxLineLength: 55, shouldPlaceDotsAfterNewlines: false }
    )
  ),
  assertEquals(
    `g.V().
  has('person', 'name', 'marko').
  shortestPath().
    with(ShortestPath.target, __.has('name', 'josh')).
    with(ShortestPath.includeEdges, true)`,
    formatQuery(
      "g.V().has('person','name','marko').shortestPath().with(ShortestPath.target, __.has('name','josh')).with(ShortestPath.includeEdges, true)",
      { indentation: 0, maxLineLength: 55, shouldPlaceDotsAfterNewlines: false }
    )
  ),
  assertEquals(
    `g.inject(
  g.withComputer().
    V().
    shortestPath().
      with(ShortestPath.distance, 'weight').
      with(ShortestPath.includeEdges, true).
      with(ShortestPath.maxDistance, 1).
    toList().
    toArray()).
  map(unfold().values('name', 'weight').fold())`,
    formatQuery(
      "g.inject(g.withComputer().V().shortestPath().with(ShortestPath.distance, 'weight').with(ShortestPath.includeEdges, true).with(ShortestPath.maxDistance, 1).toList().toArray()).map(unfold().values('name','weight').fold())",
      { indentation: 0, maxLineLength: 50, shouldPlaceDotsAfterNewlines: false }
    )
  ),
  assertEquals(
    `g.V().
  hasLabel('person').
  valueMap().
    with(WithOptions.tokens)`,
    formatQuery(
      "g.V().hasLabel('person').valueMap().with(WithOptions.tokens)",
      { indentation: 0, maxLineLength: 35, shouldPlaceDotsAfterNewlines: false }
    )
  ),
  assertEquals(
    `g.V().
  hasLabel('person').
  valueMap('name').
    with(
      WithOptions.tokens,
      WithOptions.labels)`,
    formatQuery(
      "g.V().hasLabel('person').valueMap('name').with(WithOptions.tokens,WithOptions.labels)",
      { indentation: 0, maxLineLength: 35, shouldPlaceDotsAfterNewlines: false }
    )
  ),
  assertEquals(
    `g.V().
  hasLabel('person').
  properties('location').
  valueMap().
    with(
      WithOptions.tokens,
      WithOptions.values)`,
    formatQuery(
      "g.V().hasLabel('person').properties('location').valueMap().with(WithOptions.tokens, WithOptions.values)",
      { indentation: 0, maxLineLength: 35, shouldPlaceDotsAfterNewlines: false }
    )
  ),
];

module.exports = WithModulatorIndentationAssertions;
