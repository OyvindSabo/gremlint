import { formatQuery } from '..';

// If modulators have to be wrapped, they should be indented with two additional spaces, but consecutive steps should
// not be indented with two additional spaces. Check that as-steps are indented as modulators.
test('Wrapped modulators should be indented with two spaces', () => {
  // Test as()-modulator indentation
  expect(
    formatQuery(
      "g.V().has('name', within('marko', 'vadas', 'josh')).as('person').V().has('name', within('lop', 'ripple')).addE('uses').from('person')",
      {
        indentation: 0,
        maxLineLength: 50,
        shouldPlaceDotsAfterLineBreaks: false,
      },
    ),
  ).toBe(`g.V().
  has('name', within('marko', 'vadas', 'josh')).
    as('person').
  V().
  has('name', within('lop', 'ripple')).
  addE('uses').from('person')`);
});
