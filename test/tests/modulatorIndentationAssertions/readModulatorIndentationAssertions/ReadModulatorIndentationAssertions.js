const { assertEquals } = require('../../../test.js');
const { formatQuery } = require('../../../../src/libs/gremlint/Gremlint.js');

const ReadModulatorIndentationAssertions = [
  // If modulators have to be wrapped, they should be indented with two
  // additional spaces, but consecutive steps should not be indented with two
  // additional spaces.
  // Check that read-steps are indented as modulators.
  assertEquals(
    `g.io(someInputFile).
    read().
  iterate()`,
    formatQuery('g.io(someInputFile).read().iterate()', {
      indentation: 0,
      maxLineLength: 20,
      shouldPlaceDotsAfterNewlines: false,
    })
  ),
];

module.exports = ReadModulatorIndentationAssertions;
