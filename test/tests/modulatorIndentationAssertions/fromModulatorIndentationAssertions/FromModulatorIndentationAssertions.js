const { assertEquals } = require('../../../test.js');
const { formatQuery } = require('../../../../src/libs/gremlint/Gremlint.js');

const FromModulatorIndentationAssertions = [
  // If modulators have to be wrapped, they should be indented with two
  // additional spaces, but consecutive steps should not be indented with two
  // additional spaces.
  // Check that from-steps are indented as modulators.
  assertEquals(
    `g.V().
  has(
    'person',
    'name',
    'vadas').
    as('e').
  in('knows').
    as('m').
  out('knows').
  where(neq('e')).
  path().
    from('m').
    by('name')`,
    formatQuery(
      "g.V().has('person','name','vadas').as('e').in('knows').as('m').out('knows').where(neq('e')).path().from('m').by('name')",
      {
        indentation: 0,
        maxLineLength: 20,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),
];

module.exports = FromModulatorIndentationAssertions;
