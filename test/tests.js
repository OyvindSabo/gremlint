const { runTests, test, assertEquals } = include('test/test.js');
const { formatQuery } = include('src/libs/gremlint/Gremlint.js');

runTests(
  test(
    'No line in the query should exceed the maximum line length',

    // When the maximum line length is equal to the length of the query, no line
    // wrapping should occur
    assertEquals(
      "g.V().hasLabel('person').where(outE('created').count().is(P.gte(2))).count()",
      formatQuery(
        "g.V().hasLabel('person').where(outE('created').count().is(P.gte(2))).count()",
        { indentation: 0, maxLineLength: 76 }
      )
    ),

    // A query of length 77 should be wrapped when the maximum line length is
    // set to 76
    assertEquals(
      `g.V().
  hasLabel('person').
  where(outE('created').count().is(P.gte(2))).
  count()`,
      formatQuery(
        "g.V().hasLabel('person').where(outE('created').count().is(P.gte(2))).count()",
        { indentation: 0, maxLineLength: 75 }
      )
    ),

    // When wrapping occurs, the parentheses, punctuations or commas after the
    // wrapped tokens should be included when considering whether to further
    // wrap the query. This doesn't currently work, as the following test shows
    assertEquals(
      `g.V().
  hasLabel('person').
  where(
    outE('created').count().is(P.gte(2))).
  count()`,
      formatQuery(
        "g.V().hasLabel('person').where(outE('created').count().is(P.gte(2))).count()",
        { indentation: 0, maxLineLength: 45 }
      )
    )
  ),

  test(
    'Wrapped modulators should be indented with two spaces',
    assertEquals(
      `g.V().
  group().
    by().
    by(bothE().count())`,
      formatQuery('g.V().group().by().by(bothE().count())', {
        indentation: 0,
        maxLineLength: 35,
      })
    ),
    assertEquals(
      `g.V().
  hasLabel('person').
  group().
    by(values('name', 'age').fold()).
  unfold().
  filter(select(values).count(local).is(gt(1)))`,
      formatQuery(
        "g.V().hasLabel('person').group().by(values('name', 'age').fold()).unfold().filter(select(values).count(local).is(gt(1)))",
        { indentation: 0, maxLineLength: 80 }
      )
    ),
    assertEquals(
      `g.V().
  hasLabel('person').
  groupCount().
    by(
      values('age').
      choose(
        is(lt(28)),
        constant('young'),
        choose(is(lt(30)), constant('old'), constant('very old'))))`,
      formatQuery(
        "g.V().hasLabel('person').groupCount().by(values('age').choose(is(lt(28)),constant('young'),choose(is(lt(30)), constant('old'), constant('very old'))))",
        { indentation: 0, maxLineLength: 80 }
      )
    )
  ),

  test(
    'Add linebreak after punctuation, not before',
    assertEquals(
      `g.V().
  has('name', 'marko').
  out('knows').
  has('age', gt(29)).
  values('name')`,
      formatQuery(
        "g.V().has('name', 'marko').out('knows').has('age', gt(29)).values('name')",
        { indentation: 0, maxLineLength: 70 }
      )
    ),
    assertEquals(
      `g.V().
  hasLabel('person').
  group().
    by(values('name', 'age').fold()).
  unfold().
  filter(
    select(values).
    count(local).
    is(gt(1)))`,
      formatQuery(
        "g.V().hasLabel('person').group().by(values('name', 'age').fold()).unfold().filter(select(values).count(local).is(gt(1)))",
        { indentation: 0, maxLineLength: 40 }
      )
    )
  )
);
