const { assertEquals } = require('../../../test.js');
const { formatQuery } = require('../../../../src/libs/gremlint/Gremlint.js');

const ByModulatorWrappingAssertions = [
  assertEquals(
    `g.V().
  hasLabel('person').as('person').
  properties('location').as('location').
  select('person', 'location').by('name').by(valueMap())`,
    formatQuery(
      "g.V().hasLabel('person').as('person').properties('location').as('location').select('person','location').by('name').by(valueMap())",
      {
        indentation: 0,
        maxLineLength: 80,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),

  assertEquals(
    `g.V().
  hasLabel('person').as('person').
  properties('location').as('location').
  select('person', 'location').
    by('name').
    by(valueMap())`,
    formatQuery(
      "g.V().hasLabel('person').as('person').properties('location').as('location').select('person','location').by('name').by(valueMap())",
      {
        indentation: 0,
        maxLineLength: 40,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),

  assertEquals(
    `g.V().
  hasLabel('person').as('person').
  properties('location').
    as('location').
  select('person', 'location').
    by('name').
    by(valueMap())`,
    formatQuery(
      "g.V().hasLabel('person').as('person').properties('location').as('location').select('person','location').by('name').by(valueMap())",
      {
        indentation: 0,
        maxLineLength: 35,
        shouldPlaceDotsAfterLineBreaks: false,
      }
    )
  ),
];

module.exports = ByModulatorWrappingAssertions;
