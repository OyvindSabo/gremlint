import { formatQuery } from '..';

test('Both top-level and inlined non-Gremlin code should be indented together with the Gremlin query', () => {
  // Test that top-level and inlined non-Gremlin code are not indented when indentation is 0
  expect(
    formatQuery(
      `hasField = { field -> __.has(field) }

profitQuery = g.V().
filter(hasField('sell_price')).
filter(hasField('buy_price')).
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
  ).toBe(`hasField = { field -> __.has(field) }

profitQuery = g.V().
  filter(hasField('sell_price')).
  filter(hasField('buy_price')).
  project('product', 'profit').
    by('name').
    by{ it.get().value('sell_price') -
        it.get().value('buy_price') };`);

  // Test that top-level and inlined non-Gremlin code are not indented when indentation is 20
  expect(
    formatQuery(
      `hasField = { field -> __.has(field) }
      
profitQuery = g.V().
filter(hasField('sell_price')).
filter(hasField('buy_price')).
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
  ).toBe(`                    hasField = { field -> __.has(field) }

                    profitQuery = g.V().
                      filter(hasField('sell_price')).
                      filter(hasField('buy_price')).
                      project('product', 'profit').
                        by('name').
                        by{ it.get().value('sell_price') -
                            it.get().value('buy_price') };`);
});
