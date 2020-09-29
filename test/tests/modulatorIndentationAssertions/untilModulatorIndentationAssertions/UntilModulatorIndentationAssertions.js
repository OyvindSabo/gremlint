const { assertEquals } = require('../../../test.js');
const { formatQuery } = require('../../../../src/libs/gremlint/Gremlint.js');

const UntilModulatorIndentationAssertions = [
  // If modulators have to be wrapped, they should be indented with two
  // additional spaces, but consecutive steps should not be indented with two
  // additional spaces.
  // Check that until-steps are indented as modulators.
  assertEquals(
    `g.V(6).
  repeat('a', both('created').simplePath()).
    emit(
      repeat('b', both('knows')).
        until(loops('b').as('b').where(loops('a').as('b'))).
      hasId(2)).
  dedup()`,
    formatQuery(
      "g.V(6).repeat('a', both('created').simplePath()).emit(repeat('b', both('knows')).until(loops('b').as('b').where(loops('a').as('b'))).hasId(2)).dedup()",
      {
        indentation: 0,
        maxLineLength: 40,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),
];

module.exports = UntilModulatorIndentationAssertions;
