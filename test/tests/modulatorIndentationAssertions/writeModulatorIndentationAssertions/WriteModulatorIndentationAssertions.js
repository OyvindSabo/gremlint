const { assertEquals } = include('test/test.js');
const { formatQuery } = include('src/libs/gremlint/Gremlint.js');

const WriteModulatorIndentationAssertions = [
  // If modulators have to be wrapped, they should be indented with two
  // additional spaces, but consecutive steps should not be indented with two
  // assitional spaces
  assertEquals(
    `g.io(someOutputFile).
    write().
  iterate()`,
    formatQuery('g.io(someOutputFile).write().iterate()', {
      indentation: 0,
      maxLineLength: 25,
      shouldPlaceDotsAfterNewlines: false,
    })
  ),
];

module.exports = WriteModulatorIndentationAssertions;
