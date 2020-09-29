const { assertEquals } = require('../../../test.js');
const { formatQuery } = require('../../../../src/libs/gremlint/Gremlint.js');

const ByModulatorWrappingAssertions = [
  // No weapping: All modulators should end up on the same line as the step they
  // are modulating.
  assertEquals(
    'g.V().group().by().by(bothE().count())',
    formatQuery('g.V().group().by().by(bothE().count())', {
      indentation: 0,
      maxLineLength: 40,
      shouldPlaceDotsAfterLineBreaks: false,
    })
  ),
  // Line wrapping: The modulators fit on the line of the step they are
  // modulating, so they are not wrapped.
  assertEquals(
    `g.V().
  group().by().by(bothE().count())`,
    formatQuery('g.V().group().by().by(bothE().count())', {
      indentation: 0,
      maxLineLength: 35,
      shouldPlaceDotsAfterLineBreaks: false,
    })
  ),
  // Line wrapping: The modulators don't fit on the line of the step they are
  // modulating, so they are all wrapped and indented with two spaces relative
  // to the step they are modulating.
  assertEquals(
    `g.V().
  group().
    by().
    by(bothE().count())`,
    formatQuery('g.V().group().by().by(bothE().count())', {
      indentation: 0,
      maxLineLength: 30,
      shouldPlaceDotsAfterLineBreaks: false,
    })
  ),

  // The next examples test queries which have regular steps following the
  // modulator.

  // Line wrapping: The modulators fit on the line of the step they are
  // modulating, so they are not wrapped.
  assertEquals(
    `g.V().
  hasLabel('person').
  group().by(values('name', 'age').fold()).
  unfold().
  filter(
    select(values).count(local).is(gt(1)))`,
    formatQuery(
      "g.V().hasLabel('person').group().by(values('name', 'age').fold()).unfold().filter(select(values).count(local).is(gt(1)))",
      {
        indentation: 0,
        maxLineLength: 45,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),
  // Line wrapping: The modulators don't fit on the line of the step they are
  // modulating, so they are all wrapped and indented with two spaces relative
  // to the step they are modulating.
  assertEquals(
    `g.V().
  hasLabel('person').
  group().
    by(values('name', 'age').fold()).
  unfold().
  filter(
    select(values).
    count(local).
    is(gt(1)))`,
    formatQuery(
      "g.V().hasLabel('person').group().by(values('name', 'age').fold()).unfold().filter(select(values).count(local).is(gt(1)))",
      {
        indentation: 0,
        maxLineLength: 40,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),
];

module.exports = ByModulatorWrappingAssertions;
