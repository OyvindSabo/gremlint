import { formatQuery } from '..';

test('Non-methods in a traversal should be indented correctly, even if this might never occur in a valid query', () => {
  expect(
    formatQuery('g.V().stepWhichIsNotAMethod.stepWhichIsAMethod()', {
      indentation: 0,
      maxLineLength: 45,
      shouldPlaceDotsAfterLineBreaks: false,
    }),
  ).toBe(`g.V().
  stepWhichIsNotAMethod.stepWhichIsAMethod()`);

  expect(
    formatQuery('g.V().stepWhichIsNotAMethod', {
      indentation: 0,
      maxLineLength: 25,
      shouldPlaceDotsAfterLineBreaks: false,
    }),
  ).toBe(`g.V().
  stepWhichIsNotAMethod`);
});
