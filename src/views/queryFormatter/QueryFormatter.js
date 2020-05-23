const QueryInput = include('src/components/queryInput/QueryInput.js');
const { compose } = include('src/libs/simpleHTML/SimpleHTML.js');
const { getQueryInput, setQueryInput } = include('src/store/Store.js');

const QueryFormatter = () => {
  const element = compose('div', { style: 'padding: 10px;' }, [
    QueryInput(() => ({
      value: getQueryInput(),
      oninput: ({ target }) => setQueryInput(target.value),
    })),
  ]);
  return element;
};

module.exports = QueryFormatter;
