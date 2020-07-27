const { assertEquals } = include('test/test.js');
const { formatQuery } = include('src/libs/gremlint/Gremlint.js');

const ReadModulatorIndentationAssertions = [
  // If modulators have to be wrapped, they should be indented with two
  // additional spaces, but consecutive steps should not be indented with two
  // assitional spaces
  assertEquals(
    `g.io(someInputFile).
    read().
  iterate()`,
    formatQuery('g.io(someInputFile).read().iterate()', {
      indentation: 0,
      maxLineLength: 20,
    })
  ),
];

module.exports = ReadModulatorIndentationAssertions;
