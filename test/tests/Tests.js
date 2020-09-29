const { runTests, test, assertEquals } = require('../test.js');
const { formatQuery } = require('../../src/libs/gremlint/Gremlint.js');
const MaxLineLengthAssertions = require('./maxLineLengthAssertions/MaxLineLengthAssertions.js');
const ModulatorIndentationAssertions = require('./modulatorIndentationAssertions/ModulatorIndentationAssertions.js');
const ModulatorWrappingAssertions = require('./modulatorWrappingAssertions/ModulatorWrappingAssertions.js');
const DotsAfterLineBreaksAssertions = require('./dotsAfterLineBreaksAssertions/DotsAfterLineBreaksAssertions.js');
const NonMethodIndentationAssertions = require('./nonMethodIndentationAssertions/NonMethodIndentationAssertions.js');

const doRunTests = () => {
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
      'If dots are configured to be placed after line breaks, make sure they are correctly placed, and not missing, nor duplicated',
      ...DotsAfterLineBreaksAssertions
    ),

    test(
      'Non-methods in a traversal should be indented correctly, even if this might never occur in a valid query',
      ...NonMethodIndentationAssertions
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
};

module.exports = doRunTests;
