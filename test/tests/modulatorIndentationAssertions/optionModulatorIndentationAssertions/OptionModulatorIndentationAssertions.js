const { assertEquals } = include('test/test.js');
const { formatQuery } = include('src/libs/gremlint/Gremlint.js');

const OptionModulatorIndentationAssertions = [
  // If modulators have to be wrapped, they should be indented with two
  // additional spaces, but consecutive steps should not be indented with two
  // assitional spaces
  assertEquals(
    `g.V().
  hasLabel('person').
  choose(values('name')).
    option('marko', values('age')).
    option('josh', values('name')).
    option('vadas', elementMap()).
    option('peter', label())`,
    formatQuery(
      "g.V().hasLabel('person').choose(values('name')).option('marko', values('age')).option('josh', values('name')).option('vadas', elementMap()).option('peter', label())",
      { indentation: 0, maxLineLength: 80, shouldPlaceDotsAfterNewlines: false }
    )
  ),
];

module.exports = OptionModulatorIndentationAssertions;