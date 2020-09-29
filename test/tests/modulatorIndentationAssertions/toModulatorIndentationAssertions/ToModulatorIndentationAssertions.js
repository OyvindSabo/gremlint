const { assertEquals } = require('../../../test.js');
const { formatQuery } = require('../../../../src/libs/gremlint/Gremlint.js');

const ToModulatorIndentationAssertions = [
  // If modulators have to be wrapped, they should be indented with two
  // additional spaces, but consecutive steps should not be indented with two
  // additional spaces.
  // Check that to-steps are indented as modulators.
  assertEquals(
    `g.V(v1).
  addE('knows').
    to(v2).
  property(
    'weight',
    0.75).
  iterate()`,
    formatQuery(
      "g.V(v1).addE('knows').to(v2).property('weight',0.75).iterate()",
      {
        indentation: 0,
        maxLineLength: 20,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),
];

module.exports = ToModulatorIndentationAssertions;
