const QueryInput = require('../../components/queryInput/QueryInput.js');
const Code = require('../../components/code/Code.js');
const TextButton = require('../../components/textButton/TextButton.js');
const AdvancedOptions = require('../../views/queryFormatter/advancedOptions/AdvancedOptions.js');
const { html, If } = require('../../libs/simpleHTML/SimpleHTML.js');
const { dispatch } = require('../../libs/simpleStore/SimpleStore.js');
const store = require('../../app/store/Store.js');
const {
  SET_QUERY_INPUT,
  TOGGLE_SHOULD_SHOW_ADVANCED_OPTIONS,
} = require('../../app/store/actions.js');

const QueryFormatter = store.provider((getState) => () => {
  const element = html('div', {}, [
    QueryInput(() => ({
      value: getState().queryInput,
      oninput: ({ target }) => dispatch(SET_QUERY_INPUT, target.value),
    })),
    TextButton(() => ({
      label: getState().shouldShowAdvancedOptions
        ? 'Hide advanced options'
        : 'Show advanced options',
      onclick: () => dispatch(TOGGLE_SHOULD_SHOW_ADVANCED_OPTIONS),
    })),
    html(
      'div',
      () => ({
        style: `max-height: ${
          getState().shouldShowAdvancedOptions ? '240px' : '0'
        }; box-shadow: inset white 0 0 10px 0; overflow: hidden; transition: 0.5s;`,
      }),
      [AdvancedOptions()]
    ),
    If(
      () => getState().queryOutput,
      () => [
        Code(() => ({
          innerText: getState().queryOutput,
          maxLineLength: getState().maxLineLength,
        })),
      ]
    ),
  ]);
  return element;
});

module.exports = QueryFormatter;
