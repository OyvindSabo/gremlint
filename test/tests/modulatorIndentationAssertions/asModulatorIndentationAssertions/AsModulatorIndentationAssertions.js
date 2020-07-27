const { assertEquals } = include('test/test.js');
const { formatQuery } = include('src/libs/gremlint/Gremlint.js');

const AsModulatorIndentationAssertions = [
  // If modulators have to be wrapped, they should be indented with two
  // additional spaces, but consecutive steps should not be indented with two
  // assitional spaces
  assertEquals(
    `g.V().
    as('a').
  out().
    as('b').
  out().
    as('c').
  select(
    'a',
    'b',
    'c')`,
    formatQuery(
      "g.V().as('a').out().as('b').out().as('c').select('a','b','c')",
      { indentation: 0, maxLineLength: 12 }
    )
  ),
];

module.exports = AsModulatorIndentationAssertions;
