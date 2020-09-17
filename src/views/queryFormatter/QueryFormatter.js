const QueryInput = require('../../components/queryInput/QueryInput.js');
const Code = require('../../components/code/Code.js');
const TextButton = require('../../components/textButton/TextButton.js');
const AdvancedOptions = require('../../views/queryFormatter/advancedOptions/AdvancedOptions.js');
const { html, If } = require('../../libs/simpleHTML/SimpleHTML.js');
const {
  getQueryInput,
  setQueryInput,
  getQueryOutput,
  getShowAdvancedOptions,
  setShowAdvancedOptions,
  getMaxLineLength,
} = require('../../store/Store.js');

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
          getShowAdvancedOptions() ? '240px' : '0'
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
