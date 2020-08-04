const { assertEquals } = include('test/test.js');
const { formatQuery } = include('src/libs/gremlint/Gremlint.js');

const With_ModulatorIndentationAssertions = [
  // If modulators have to be wrapped, they should be indented with two
  // additional spaces, but consecutive steps should not be indented with two
  // additional spaces.
  // Check that with_-steps are indented as modulators.
  assertEquals(
    `g.V().
  hasLabel('person').
  values('name').
  fold().
  order(Scope.local).
  index().
    with_(
      WithOptions.indexer,
      WithOptions.map)`,
    formatQuery(
      "g.V().hasLabel('person').values('name').fold().order(Scope.local).index().with_(WithOptions.indexer,WithOptions.map)",
      { indentation: 0, maxLineLength: 40, shouldPlaceDotsAfterNewlines: false }
    )
  ),
];

module.exports = With_ModulatorIndentationAssertions;
