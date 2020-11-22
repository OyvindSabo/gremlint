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

  // Test that relative indentation is preserved in closures which are nested
  expect(
    formatQuery(
      `g.V().filter(out('Sells').
             map{ it.get('sell_price') -
                  it.get('buy_price') }.
             where(gt(50)))`,
      { indentation: 0, maxLineLength: 45, shouldPlaceDotsAfterLineBreaks: false },
    ),
  ).toBe(
    `g.V().
  filter(
    out('Sells').
    map{ it.get('sell_price') -
         it.get('buy_price') }.
    where(gt(50)))`,
  );

  // Test that relative indentation is preserved between all the lines within a closure when not all tokens in a stepGroup are methods (for instance, g in g.V() adds to the width of the stepGroup even if it is not a method)
  expect(
    formatQuery(
      `g.V().map({ it.get('sell_price') -
            it.get('buy_price') }))`,
      {
        indentation: 0,
        maxLineLength: 35,
        shouldPlaceDotsAfterLineBreaks: false,
      },
    ),
  ).toBe(`g.V().map({ it.get('sell_price') -
            it.get('buy_price') }))`);

  // Test that relative indentation is preserved between all the lines within a closure when the first line is indented because the query doesn't start at the beginning of the line
  expect(
    formatQuery(
      `profit = g.V().map({ it.get('sell_price') -
                     it.get('buy_price') }))`,
      {
        indentation: 0,
        maxLineLength: 45,
        shouldPlaceDotsAfterLineBreaks: false,
      },
    ),
  ).toBe(`profit = g.V().map({ it.get('sell_price') -
                     it.get('buy_price') }))`);

  // Test that relative indentation is preserved between all lines within a closure when the method to which the closure is an argument is wrapped
  expect(
    formatQuery(
      `g.V(ids).
  has('factor_a').
  has('factor_b').
  project('Factor A', 'Factor B', 'Product').
    by(values('factor_a')).
    by(values('factor_b')).
    by(map{ it.get().value('factor_a') *
            it.get().value('factor_b') })`,
      { indentation: 0, maxLineLength: 40, shouldPlaceDotsAfterLineBreaks: false },
    ),
  ).toBe(`g.V(ids).
  has('factor_a').
  has('factor_b').
  project(
    'Factor A',
    'Factor B',
    'Product').
    by(values('factor_a')).
    by(values('factor_b')).
    by(
      map{ it.get().value('factor_a') *
           it.get().value('factor_b') })`);
});
