import { formatQuery } from '..';

test('Each of multiple queries formatted at once should be formatted as if they were formatted individually', () => {
  // Test that linebreaks don't happen too soon because the formatter fails to distinguish between lines from the end
  // of one query and the start of the next
  expect(
    formatQuery(
      `g.V(1).out().values('name')

g.V(1).out().map{ it.get().value('name') }

g.V(1).out().map(values('name'))`,
      {
        indentation: 0,
        maxLineLength: 45,
        shouldPlaceDotsAfterLineBreaks: false,
      },
    ),
  ).toBe(`g.V(1).out().values('name')

g.V(1).out().map{ it.get().value('name') }

g.V(1).out().map(values('name'))`);

  expect(
    formatQuery(
      `g.V().branch{ it.get().value('name') }.option('marko', values('age')).option(none, values('name'))

g.V().branch(values('name')).option('marko', values('age')).option(none, values('name'))

g.V().choose(has('name','marko'),values('age'), values('name'))`,
      {
        indentation: 0,
        maxLineLength: 70,
        shouldPlaceDotsAfterLineBreaks: false,
      },
    ),
  ).toBe(`g.V().
  branch{ it.get().value('name') }.
    option('marko', values('age')).
    option(none, values('name'))

g.V().
  branch(values('name')).
    option('marko', values('age')).
    option(none, values('name'))

g.V().choose(has('name', 'marko'), values('age'), values('name'))`);
});
