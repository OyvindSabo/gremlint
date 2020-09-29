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
    with_(ConnectedComponent.propertyName, 'component').
  project('name', 'component').
    by('name').
    by('component')`,
    formatQuery(
      "g.V().connectedComponent().with_(ConnectedComponent.propertyName, 'component').project('name','component').by('name').by('component')",
      {
        indentation: 0,
        maxLineLength: 55,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),
  assertEquals(
    `g.V().
  hasLabel('person').
  connectedComponent().
    with_(ConnectedComponent.propertyName, 'component').
    with_(ConnectedComponent.edges, outE('knows')).
  project('name', 'component').
    by('name').
    by('component')`,
    formatQuery(
      "g.V().hasLabel('person').connectedComponent().with_(ConnectedComponent.propertyName, 'component').with_(ConnectedComponent.edges, outE('knows')).project('name','component').by('name').by('component')",
      {
        indentation: 0,
        maxLineLength: 55,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),
  assertEquals(
    `g.V().
  hasLabel('software').
  values('name').
  fold().
  order(Scope.local).
  index().
    with_(WithOptions.indexer, WithOptions.list).
  unfold().
  order().by(__.tail(Scope.local, 1))`,
    formatQuery(
      "g.V().hasLabel('software').values('name').fold().order(Scope.local).index().with_(WithOptions.indexer, WithOptions.list).unfold().order().by(__.tail(Scope.local, 1))",
      {
        indentation: 0,
        maxLineLength: 50,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),
  assertEquals(
    `g.V().
  hasLabel('person').
  values('name').
  fold().
  order(Scope.local).
  index().
    with_(WithOptions.indexer, WithOptions.map)`,
    formatQuery(
      "g.V().hasLabel('person').values('name').fold().order(Scope.local).index().with_(WithOptions.indexer, WithOptions.map)",
      {
        indentation: 0,
        maxLineLength: 50,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),
  assertEquals(
    `g.io(someInputFile).
    with_(IO.reader, IO.graphson).
    read().
  iterate()`,
    formatQuery(
      'g.io(someInputFile).with_(IO.reader, IO.graphson).read().iterate()',
      {
        indentation: 0,
        maxLineLength: 35,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),
  assertEquals(
    `g.io(someOutputFile).
    with_(IO.writer, IO.graphml).
    write().
  iterate()`,
    formatQuery(
      'g.io(someOutputFile).with_(IO.writer,IO.graphml).write().iterate()',
      {
        indentation: 0,
        maxLineLength: 35,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),
  assertEquals(
    `g.V().
  hasLabel('person').
  pageRank().
    with_(PageRank.edges, __.outE('knows')).
    with_(PageRank.propertyName, 'friendRank').
  order().by('friendRank', desc).
  elementMap('name', 'friendRank')`,
    formatQuery(
      "g.V().hasLabel('person').pageRank().with_(PageRank.edges, __.outE('knows')).with_(PageRank.propertyName, 'friendRank').order().by('friendRank',desc).elementMap('name','friendRank')",
      {
        indentation: 0,
        maxLineLength: 50,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),
  assertEquals(
    `g.V().
  hasLabel('person').
  peerPressure().
    with_(PeerPressure.propertyName, 'cluster').
  group().by('cluster').by('name')`,
    formatQuery(
      "g.V().hasLabel('person').peerPressure().with_(PeerPressure.propertyName, 'cluster').group().by('cluster').by('name')",
      {
        indentation: 0,
        maxLineLength: 50,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),
  assertEquals(
    `g.V().
  shortestPath().
    with_(ShortestPath.target, __.has('name', 'peter'))`,
    formatQuery(
      "g.V().shortestPath().with_(ShortestPath.target, __.has('name','peter'))",
      {
        indentation: 0,
        maxLineLength: 55,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),
  assertEquals(
    `g.V().
  shortestPath().
    with_(ShortestPath.edges, Direction.IN).
    with_(ShortestPath.target, __.has('name', 'josh'))`,
    formatQuery(
      "g.V().shortestPath().with_(ShortestPath.edges, Direction.IN).with_(ShortestPath.target, __.has('name','josh'))",
      {
        indentation: 0,
        maxLineLength: 55,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),
  assertEquals(
    `g.V().
  has('person', 'name', 'marko').
  shortestPath().
    with_(ShortestPath.target, __.has('name', 'josh'))`,
    formatQuery(
      "g.V().has('person','name','marko').shortestPath().with_(ShortestPath.target,__.has('name','josh'))",
      {
        indentation: 0,
        maxLineLength: 55,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),
  assertEquals(
    `g.V().
  has('person', 'name', 'marko').
  shortestPath().
    with_(ShortestPath.target, __.has('name', 'josh')).
    with_(ShortestPath.distance, 'weight')`,
    formatQuery(
      "g.V().has('person','name','marko').shortestPath().with_(ShortestPath.target, __.has('name','josh')).with_(ShortestPath.distance, 'weight')",
      {
        indentation: 0,
        maxLineLength: 55,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),
  assertEquals(
    `g.V().
  has('person', 'name', 'marko').
  shortestPath().
    with_(ShortestPath.target, __.has('name', 'josh')).
    with_(ShortestPath.includeEdges, true)`,
    formatQuery(
      "g.V().has('person','name','marko').shortestPath().with_(ShortestPath.target, __.has('name','josh')).with_(ShortestPath.includeEdges, true)",
      {
        indentation: 0,
        maxLineLength: 55,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),
  assertEquals(
    `g.inject(
  g.withComputer().
    V().
    shortestPath().
      with_(ShortestPath.distance, 'weight').
      with_(ShortestPath.includeEdges, true).
      with_(ShortestPath.maxDistance, 1).
    toList().
    toArray()).
  map(unfold().values('name', 'weight').fold())`,
    formatQuery(
      "g.inject(g.withComputer().V().shortestPath().with_(ShortestPath.distance, 'weight').with_(ShortestPath.includeEdges, true).with_(ShortestPath.maxDistance, 1).toList().toArray()).map(unfold().values('name','weight').fold())",
      {
        indentation: 0,
        maxLineLength: 50,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),
  assertEquals(
    `g.V().
  hasLabel('person').
  valueMap().
    with_(WithOptions.tokens)`,
    formatQuery(
      "g.V().hasLabel('person').valueMap().with_(WithOptions.tokens)",
      {
        indentation: 0,
        maxLineLength: 35,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),
  assertEquals(
    `g.V().
  hasLabel('person').
  valueMap('name').
    with_(
      WithOptions.tokens,
      WithOptions.labels)`,
    formatQuery(
      "g.V().hasLabel('person').valueMap('name').with_(WithOptions.tokens,WithOptions.labels)",
      {
        indentation: 0,
        maxLineLength: 35,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),
  assertEquals(
    `g.V().
  hasLabel('person').
  properties('location').
  valueMap().
    with_(
      WithOptions.tokens,
      WithOptions.values)`,
    formatQuery(
      "g.V().hasLabel('person').properties('location').valueMap().with_(WithOptions.tokens, WithOptions.values)",
      {
        indentation: 0,
        maxLineLength: 35,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),
];

module.exports = WithModulatorIndentationAssertions;
