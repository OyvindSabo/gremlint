const { assertEquals } = require('../../../test.js');
const { formatQuery } = require('../../../../src/libs/gremlint/Gremlint.js');

const WriteModulatorIndentationAssertions = [
  // If modulators have to be wrapped, they should be indented with two
  // additional spaces, but consecutive steps should not be indented with two
  // additional spaces.
  // Check that write-steps are indented as modulators.
  assertEquals(
    `g.io(someOutputFile).
    write().
  iterate()`,
    formatQuery('g.io(someOutputFile).write().iterate()', {
      indentation: 0,
      maxLineLength: 25,
      shouldPlaceDotsAfterLineBreaks: false,
    })
  ),
];

module.exports = WriteModulatorIndentationAssertions;
