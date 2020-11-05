import { formatQuery } from '..';

test('Each of multiple queries formatted at once should be formatted as if they were formatted individually', () => {
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
