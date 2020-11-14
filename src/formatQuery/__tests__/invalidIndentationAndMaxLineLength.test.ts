import { formatQuery } from '..';

test('The formatter should not crash when indentation is equal to maxLineLength', () => {
  expect(
    formatQuery(`g.V()`, {
      indentation: 0,
      maxLineLength: 0,
      shouldPlaceDotsAfterLineBreaks: false,
    }),
  ).toBe(`g.V(
)`);
});
