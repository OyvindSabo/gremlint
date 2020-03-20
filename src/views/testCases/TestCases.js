const { div$ } = include('src/libraries/fakeReact/FakeReact.js');
const QueryOutput = include('src/components/queryOutput/QueryOutput.js');

const pipe = value => (...fns) => fns.reduce((value, fn) => fn(value), value);

const formatQuery = (query, config = { maxLineLength: 80 }) => pipe(query)();

const testCases = [`g.V().hasLabel('application')`, `g.V().limit(10)`];
const TestCases = ({ state }) =>
  div$(
    ...testCases.map(query => {
      const formattedQuery = formatQuery(query);
      return div$(
        QueryOutput(query).setStyle({
          background: formattedQuery === query ? 'lightgreen' : 'lightpink',
        }),
        QueryOutput(formattedQuery)
      ).setStyle({
        marginBottom: '20px',
      });
    })
  );

module.exports = TestCases;
