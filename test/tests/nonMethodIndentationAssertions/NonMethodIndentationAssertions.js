const { assertEquals } = require('../../test.js');
const { formatQuery } = require('../../../src/libs/gremlint/Gremlint.js');

const NonMethodIndentationAssertions = [
  // Check that non-methods which are neither the first nor the last step in a
  // traversal, and are at the start of a line are indented correctly.
  assertEquals(
    `g.V().
  stepWhichIsNotAMethod.stepWhichIsAMethod()`,
    formatQuery('g.V().stepWhichIsNotAMethod.stepWhichIsAMethod()', {
      indentation: 0,
      maxLineLength: 45,
      shouldPlaceDotsAfterNewlines: false,
    })
  ),
  // Check that non-methods which are the last step in a traversal and are at
  // the start of a line are indented correctly.
  assertEquals(
    `g.V().
  stepWhichIsNotAMethod`,
    formatQuery('g.V().stepWhichIsNotAMethod', {
      indentation: 0,
      maxLineLength: 25,
      shouldPlaceDotsAfterNewlines: false,
    })
  ),
];

module.exports = NonMethodIndentationAssertions;
