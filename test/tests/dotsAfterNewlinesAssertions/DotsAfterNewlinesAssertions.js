const { assertEquals } = include('test/test.js');
const { formatQuery } = include('src/libs/gremlint/Gremlint.js');

const DotsAfterNewlinesAssertions = [
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
      { indentation: 0, maxLineLength: 40, shouldPlaceDotsAfterNewlines: false }
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
      { indentation: 0, maxLineLength: 35, shouldPlaceDotsAfterNewlines: true }
    )
  ),
];

module.exports = DotsAfterNewlinesAssertions;
