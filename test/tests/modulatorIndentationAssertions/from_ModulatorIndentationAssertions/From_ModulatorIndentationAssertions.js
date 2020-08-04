const { assertEquals } = include('test/test.js');
const { formatQuery } = include('src/libs/gremlint/Gremlint.js');

const From_ModulatorIndentationAssertions = [
  // If modulators have to be wrapped, they should be indented with two
  // additional spaces, but consecutive steps should not be indented with two
  // additional spaces.
  // Check that from_-steps are indented as modulators.
  assertEquals(
    `g.V().
  has(
    'person',
    'name',
    'vadas').
    as_('e').
  in('knows').
    as_('m').
  out('knows').
  where(neq('e')).
  path().
    from_('m').
    by('name')`,
    formatQuery(
      "g.V().has('person','name','vadas').as_('e').in('knows').as_('m').out('knows').where(neq('e')).path().from_('m').by('name')",
      { indentation: 0, maxLineLength: 20, shouldPlaceDotsAfterNewlines: false }
    )
  ),
];

module.exports = From_ModulatorIndentationAssertions;
