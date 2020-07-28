const { assertEquals } = include('test/test.js');
const { formatQuery } = include('src/libs/gremlint/Gremlint.js');

const ByModulatorWrappingAssertions = [
  assertEquals(
    'g.V().group().by().by(bothE().count())',
    formatQuery('g.V().group().by().by(bothE().count())', {
      indentation: 0,
      maxLineLength: 38,
      shouldPlaceDotsAfterNewlines: false,
    })
  ),
  assertEquals(
    `g.V().
  group().
    by().
    by(bothE().count())`,
    formatQuery('g.V().group().by().by(bothE().count())', {
      indentation: 0,
      maxLineLength: 37,
      shouldPlaceDotsAfterNewlines: false,
    })
  ),

  // Modulators should be placed on the same line as the step they are
  // modulating, if possible
  assertEquals(
    `g.V().
  hasLabel('person').
  group().by(values('name', 'age').fold()).
  unfold().
  filter(
    select(values).count(local).is(gt(1)))`,
    formatQuery(
      "g.V().hasLabel('person').group().by(values('name', 'age').fold()).unfold().filter(select(values).count(local).is(gt(1)))",
      { indentation: 0, maxLineLength: 43, shouldPlaceDotsAfterNewlines: false }
    )
  ),
];

module.exports = ByModulatorWrappingAssertions;
