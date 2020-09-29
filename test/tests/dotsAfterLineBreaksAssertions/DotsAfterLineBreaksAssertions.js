const { assertEquals } = require('../../test.js');
const { formatQuery } = require('../../../src/libs/gremlint/Gremlint.js');

const DotsAfterLineBreaksAssertions = [
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
  assertEquals(
    `g.V()
  .hasLabel('person')
  .group()
    .by(
      values('name', 'age').fold())
  .unfold()
  .filter(
    select(values)
    .count(local)
    .is(gt(1)))`,
    formatQuery(
      "g.V().hasLabel('person').group().by(values('name', 'age').fold()).unfold().filter(select(values).count(local).is(gt(1)))",
      {
        indentation: 0,
        maxLineLength: 35,
        shouldPlaceDotsAfterLineBreaks: true,
      }
    )
  ),
];

module.exports = DotsAfterLineBreaksAssertions;
