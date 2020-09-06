const { assertEquals } = include('test/test.js');
const { formatQuery } = include('src/libs/gremlint/Gremlint.js');

const As_ModulatorIndentationAssertions = [
  // If modulators have to be wrapped, they should be indented with two
  // additional spaces, but consecutive steps should not be indented with two
  // additional spaces.
  // Check that as_-steps are indented as modulators.
  assertEquals(
    `g.V().
  has('name', within('marko', 'vadas', 'josh')).
    as_('person').
  V().
  has('name', within('lop', 'ripple')).
  addE('uses').from('person')`,
    formatQuery(
      "g.V().has('name', within('marko', 'vadas', 'josh')).as_('person').V().has('name', within('lop', 'ripple')).addE('uses').from('person')",
      { indentation: 0, maxLineLength: 50, shouldPlaceDotsAfterNewlines: false }
    )
  ),
];

module.exports = As_ModulatorIndentationAssertions;