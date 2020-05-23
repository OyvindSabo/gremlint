const QueryInput = include('src/components/queryInput/QueryInput.js');
const Code = include('src/components/code/Code.js');
const { compose, If } = include('src/libs/simpleHTML/SimpleHTML.js');
const { getQueryInput, setQueryInput, getQueryOutput } = include(
  'src/store/Store.js'
);

const QueryFormatter = () => {
  const element = compose('div', {}, [
    QueryInput(() => ({
      value: getQueryInput(),
      oninput: ({ target }) => setQueryInput(target.value),
    })),
    If(
      () => getQueryOutput(),
      () => [Code(() => ({ innerText: getQueryOutput() }))]
    ),
  ]);
  return element;
};

module.exports = QueryFormatter;
