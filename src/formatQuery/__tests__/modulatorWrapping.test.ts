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
});
