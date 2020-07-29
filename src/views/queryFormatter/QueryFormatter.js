const QueryInput = include('src/components/queryInput/QueryInput.js');
const Code = include('src/components/code/Code.js');
const TextButton = include('src/components/textButton/TextButton.js');
const AdvancedOptions = include(
  'src/views/queryFormatter/advancedOptions/AdvancedOptions.js'
);
const { html, If } = include('src/libs/simpleHTML/SimpleHTML.js');
const {
  getQueryInput,
  setQueryInput,
  getQueryOutput,
  getShowAdvancedOptions,
  setShowAdvancedOptions,
  getMaxLineLength,
} = include('src/store/Store.js');

const QueryFormatter = () => {
  const element = html('div', {}, [
    QueryInput(() => ({
      value: getQueryInput(),
      oninput: ({ target }) => setQueryInput(target.value),
    })),
    TextButton(() => ({
      label: getShowAdvancedOptions()
        ? 'Hide advanced options'
        : 'Show advanced options',
      onclick: () => setShowAdvancedOptions(!getShowAdvancedOptions()),
    })),
    html(
      'div',
      () => ({
        style: `max-height: ${
          getShowAdvancedOptions() ? '360px' : '0'
        }; box-shadow: inset white 0 0 10px 0; overflow: hidden; transition: 0.5s;`,
      }),
      [AdvancedOptions()]
    ),
    If(
      () => getQueryOutput(),
      () => [
        Code(() => ({
          innerText: getQueryOutput(),
          maxLineLength: getMaxLineLength(),
        })),
      ]
    ),
  ]);
  return element;
};

module.exports = QueryFormatter;
