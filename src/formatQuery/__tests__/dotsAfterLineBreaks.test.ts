import { formatQuery } from '..';

test('If dots are configured to be placed after line breaks, make sure they are correctly placed, and neither missing nor duplicated', () => {
  expect(
    formatQuery(
      "g.V().hasLabel('person').group().by(values('name', 'age').fold()).unfold().filter(select(values).count(local).is(gt(1)))",
      {
        indentation: 0,
        maxLineLength: 40,
        shouldPlaceDotsAfterLineBreaks: false,
      },
    ),
  ).toBe(`g.V().
  hasLabel('person').
  group().
    by(values('name', 'age').fold()).
  unfold().
  filter(
    select(values).
    count(local).
    is(gt(1)))`);

  expect(
    formatQuery(
      "g.V().hasLabel('person').group().by(values('name', 'age').fold()).unfold().filter(select(values).count(local).is(gt(1)))",
      {
        indentation: 0,
        maxLineLength: 35,
        shouldPlaceDotsAfterLineBreaks: true,
      },
    ),
  ).toBe(`g.V()
  .hasLabel('person')
  .group()
    .by(
      values('name', 'age').fold())
  .unfold()
  .filter(
    select(values)
    .count(local)
    .is(gt(1)))`);
});
