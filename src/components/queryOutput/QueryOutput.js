const { div$ } = include('src/libraries/fakeReact/FakeReact.js');

const QueryOutput = (...children) =>
  div$(...children).setStyle({
    fontFamily: '"Courier New", Courier, monospace',
    whiteSpace: 'pre-wrap',
    borderRadius: '5px',
    padding: '10px',
  });

module.exports = QueryOutput;
