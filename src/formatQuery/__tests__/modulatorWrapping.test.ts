import { formatQuery } from '..';

test("Modulators should not be line-wrapped if they can fit on the line of the step they're modulating", () => {
  // Test as()-modulator wrapping
  expect(
    formatQuery(
      "g.V().hasLabel('person').as('person').properties('location').as('location').select('person','location').by('name').by(valueMap())",
      {
        indentation: 0,
        maxLineLength: 80,
        shouldPlaceDotsAfterLineBreaks: false,
      },
    ),
  ).toBe(`g.V().
  hasLabel('person').as('person').
  properties('location').as('location').
  select('person', 'location').by('name').by(valueMap())`);
  expect(
    formatQuery(
      "g.V().hasLabel('person').as('person').properties('location').as('location').select('person','location').by('name').by(valueMap())",
      {
        indentation: 0,
        maxLineLength: 40,
        shouldPlaceDotsAfterLineBreaks: false,
      },
    ),
  ).toBe(`g.V().
  hasLabel('person').as('person').
  properties('location').as('location').
  select('person', 'location').
    by('name').
    by(valueMap())`);
  expect(
    formatQuery(
      "g.V().hasLabel('person').as('person').properties('location').as('location').select('person','location').by('name').by(valueMap())",
      {
        indentation: 0,
        maxLineLength: 35,
        shouldPlaceDotsAfterLineBreaks: false,
      },
    ),
  ).toBe(`g.V().
  hasLabel('person').as('person').
  properties('location').
    as('location').
  select('person', 'location').
    by('name').
    by(valueMap())`);

  // Test by()-modulator wrapping
  expect(
    formatQuery('g.V().group().by().by(bothE().count())', {
      indentation: 0,
      maxLineLength: 40,
      shouldPlaceDotsAfterLineBreaks: false,
    }),
  ).toBe('g.V().group().by().by(bothE().count())');
  expect(
    formatQuery('g.V().group().by().by(bothE().count())', {
      indentation: 0,
      maxLineLength: 35,
      shouldPlaceDotsAfterLineBreaks: false,
    }),
  ).toBe(`g.V().
  group().by().by(bothE().count())`);
  expect(
    formatQuery('g.V().group().by().by(bothE().count())', {
      indentation: 0,
      maxLineLength: 30,
      shouldPlaceDotsAfterLineBreaks: false,
    }),
  ).toBe(`g.V().
  group().
    by().
    by(bothE().count())`);
  expect(
    formatQuery(
      "g.V().hasLabel('person').group().by(values('name', 'age').fold()).unfold().filter(select(values).count(local).is(gt(1)))",
      {
        indentation: 0,
        maxLineLength: 45,
        shouldPlaceDotsAfterLineBreaks: false,
      },
    ),
  ).toBe(`g.V().
  hasLabel('person').
  group().by(values('name', 'age').fold()).
  unfold().
  filter(
    select(values).count(local).is(gt(1)))`);
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
});
