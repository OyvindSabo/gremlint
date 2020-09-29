const { assertEquals } = require('../../../test.js');
const { formatQuery } = require('../../../../src/libs/gremlint/Gremlint.js');

const TimesModulatorIndentationAssertions = [
  // If modulators have to be wrapped, they should be indented with two
  // additional spaces, but consecutive steps should not be indented with two
  // additional spaces.
  // Check that times-steps are indented as modulators.
  assertEquals(
    `g.V().
  repeat(both()).
    times(3).
  values('age').
  max()`,
    formatQuery("g.V().repeat(both()).times(3).values('age').max()", {
      indentation: 0,
      maxLineLength: 20,
      shouldPlaceDotsAfterLineBreaks: false,
    })
  ),
];

module.exports = TimesModulatorIndentationAssertions;
