const { assertEquals } = include('test/test.js');
const { formatQuery } = include('src/libs/gremlint/Gremlint.js');

const ByModulatorIndentationAssertions = [
  // If modulators have to be wrapped, they should be indented with two
  // additional spaces, but consecutive steps should not be indented with two
  // assitional spaces
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
      { indentation: 0, maxLineLength: 40, shouldPlaceDotsAfterNewlines: false }
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
      { indentation: 0, maxLineLength: 80, shouldPlaceDotsAfterNewlines: false }
    )
  ),
];

module.exports = ByModulatorIndentationAssertions;
