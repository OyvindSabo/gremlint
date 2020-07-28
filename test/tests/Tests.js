const { runTests, test, assertEquals } = include('test/test.js');
const { formatQuery } = include('src/libs/gremlint/Gremlint.js');
const MaxLineLengthAssertions = include(
  'test/tests/maxLineLengthAssertions/MaxLineLengthAssertions.js'
);
const ModulatorIndentationAssertions = include(
  'test/tests/modulatorIndentationAssertions/ModulatorIndentationAssertions.js'
);
const ModulatorWrappingAssertions = include(
  'test/tests/modulatorWrappingAssertions/ModulatorWrappingAssertions.js'
);
const DotsAfterNewlinesAssertions = include(
  'test/tests/dotsAfterNewlinesAssertions/DotsAfterNewlinesAssertions.js'
);

runTests(
  test(
    'No line in the query should exceed the maximum line length',
    ...MaxLineLengthAssertions
  ),

  test(
    'Wrapped modulators should be indented with two spaces',
    ...ModulatorIndentationAssertions
  ),

  test(
    "Modulators should not be line-wrapped if they can fit on the line of the step they're modulating",
    ...ModulatorWrappingAssertions
  ),

  test(
    'If dots are configured to be placed after newlines, make sure they are correctly placed, and not missing, nor duplicated',
    ...DotsAfterNewlinesAssertions
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
