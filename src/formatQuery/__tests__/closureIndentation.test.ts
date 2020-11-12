import { formatQuery } from '..';

test('When specifying indentation for a query, the relative indentation within closures should be preserved', () => {
  // Test that relative indentation is preserved between all the lines within a closure when indentation is 0
  expect(
    formatQuery(
      `g.V().
has('sell_price').
has('buy_price').
project('product', 'profit').
by('name').
by{ it.get().value('sell_price') -
    it.get().value('buy_price') };`,
      {
        indentation: 0,
        maxLineLength: 70,
        shouldPlaceDotsAfterLineBreaks: false,
      },
    ),
  ).toBe(`g.V().
  has('sell_price').
  has('buy_price').
  project('product', 'profit').
    by('name').
    by{ it.get().value('sell_price') -
        it.get().value('buy_price') };`);

  // Test that relative indentation is preserved between all the lines within a closure when indentation is 20
  expect(
    formatQuery(
      `g.V().
has('sell_price').
has('buy_price').
project('product', 'profit').
by('name').
by{ it.get().value('sell_price') -
    it.get().value('buy_price') };`,
      {
        indentation: 20,
        maxLineLength: 70,
        shouldPlaceDotsAfterLineBreaks: false,
      },
    ),
  ).toBe(`                    g.V().
                      has('sell_price').
                      has('buy_price').
                      project('product', 'profit').
                        by('name').
                        by{ it.get().value('sell_price') -
                            it.get().value('buy_price') };`);
});
