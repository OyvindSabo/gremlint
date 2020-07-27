const { assertEquals } = include('test/test.js');
const { formatQuery } = include('src/libs/gremlint/Gremlint.js');

const FromModulatorIndentationAssertions = [
  // If modulators have to be wrapped, they should be indented with two
  // additional spaces, but consecutive steps should not be indented with two
  // assitional spaces
  assertEquals(
    `g.V(1).as('a').
  out('created').
  in('created').
  where(neq('a')).
  addE('co-developer').
    from('a').
  property('year', 2009)`,
    formatQuery(
      "g.V(1).as('a').out('created').in('created').where(neq('a')).addE('co-developer').from('a').property('year',2009)",
      { indentation: 0, maxLineLength: 80 }
    )
  ),
];

module.exports = FromModulatorIndentationAssertions;
