const { assertEquals } = include('test/test.js');
const { formatQuery } = include('src/libs/gremlint/Gremlint.js');

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
      }
    )
  ),
];

module.exports = ByModulatorWrappingAssertions;
