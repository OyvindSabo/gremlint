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

  // Test as_()-modulator indentation
  expect(
    formatQuery(
      "g.V().has('name', within('marko', 'vadas', 'josh')).as_('person').V().has('name', within('lop', 'ripple')).addE('uses').from('person')",
      {
        indentation: 0,
        maxLineLength: 50,
        shouldPlaceDotsAfterLineBreaks: false,
      },
    ),
  ).toBe(`g.V().
  has('name', within('marko', 'vadas', 'josh')).
    as_('person').
  V().
  has('name', within('lop', 'ripple')).
  addE('uses').from('person')`);

  // Test by()-modulator indentation
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
      "g.V().hasLabel('person').groupCount().by(values('age').choose(is(lt(28)),constant('young'),choose(is(lt(30)), constant('old'), constant('very old'))))",
      {
        indentation: 0,
        maxLineLength: 80,
        shouldPlaceDotsAfterLineBreaks: false,
      },
    ),
  ).toBe(`g.V().
  hasLabel('person').
  groupCount().
    by(
      values('age').
      choose(
        is(lt(28)),
        constant('young'),
        choose(is(lt(30)), constant('old'), constant('very old'))))`);

  // Test emit()-modulator indentation
  expect(
    formatQuery("g.V(1).repeat(bothE('created').dedup().otherV()).emit().path()", {
      indentation: 0,
      maxLineLength: 45,
      shouldPlaceDotsAfterLineBreaks: false,
    }),
  ).toBe(
    `g.V(1).
  repeat(bothE('created').dedup().otherV()).
    emit().
  path()`,
  );

  expect(
    formatQuery('g.V().repeat(both()).times(1000000).emit().range(6,10)', {
      indentation: 0,
      maxLineLength: 35,
      shouldPlaceDotsAfterLineBreaks: false,
    }),
  ).toBe(
    `g.V().
  repeat(both()).
    times(1000000).
    emit().
  range(6, 10)`,
  );

  expect(
    formatQuery("g.V(1).repeat(out()).times(2).emit().path().by('name')", {
      indentation: 0,
      maxLineLength: 30,
      shouldPlaceDotsAfterLineBreaks: false,
    }),
  ).toBe(
    `g.V(1).
  repeat(out()).
    times(2).
    emit().
  path().by('name')`,
  );

  expect(
    formatQuery("g.withSack(1).V(1).repeat(sack(sum).by(constant(1))).times(10).emit().sack().math('sin _')", {
      indentation: 0,
      maxLineLength: 40,
      shouldPlaceDotsAfterLineBreaks: false,
    }),
  ).toBe(
    `g.withSack(1).
  V(1).
  repeat(sack(sum).by(constant(1))).
    times(10).
    emit().
  sack().
  math('sin _')`,
  );
});
