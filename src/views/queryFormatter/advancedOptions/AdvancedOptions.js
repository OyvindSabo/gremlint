const Toggle = require('../../../components/toggle/Toggle.js');
const { html } = require('../../../libs/simpleHTML/SimpleHTML.js');
const { dispatch } = require('../../../libs/simpleStore/SimpleStore.js');
const store = require('../../../app/store/Store.js');
const {
  SET_INDENTATION,
  SET_MAX_LINE_LENGTH,
  SET_SHOULD_PLACE_DOTS_AFTER_LINE_BREAKS,
} = require('../../../app/store/actions.js');

const {
  getInlineContainerStyle,
  getInputStyle,
  getTextStyle,
} = require('../../../libs/simpleStyle/SimpleStyle.js');

const AdvancedOptions = store.provider((getState) => () => {
  const element = html('div', {}, [
    html('div', { style: 'padding: 10px' }, [
      html('div', { innerText: 'Indentation', style: getTextStyle() }, []),
      html(
        'input',
        () => ({
          style: getInputStyle() + getInlineContainerStyle(16, 2),
          type: 'number',
          min: 0,
          max: getState().maxLineLength,
          value: getState().indentation,
          oninput: ({ target }) => {
            dispatch(SET_INDENTATION, target.value);
          },
        }),
        []
      ),
    ]),
    html('div', { style: 'padding: 10px;' }, [
      html('div', { innerText: 'Max line length', style: getTextStyle() }, []),
      html(
        'input',
        () => ({
          style: getInputStyle() + getInlineContainerStyle(16, 2),
          type: 'number',
          min: getState().indentation,
          value: getState().maxLineLength,
          oninput: ({ target }) => {
            dispatch(SET_MAX_LINE_LENGTH, target.value);
          },
        }),
        []
      ),
    ]),
    html('div', { style: 'padding: 10px;' }, [
      html('div', { innerText: 'Dot placement', style: getTextStyle() }, []),
      Toggle(() => ({
        height: '40px',
        width: '320px',
        checked: getState().shouldPlaceDotsAfterLineBreaks,
        labels: {
          checked: 'After line break',
          unchecked: 'Before line break',
        },
        onchange: (shouldPlaceDotsAfterLineBreaks) => {
          dispatch(
            SET_SHOULD_PLACE_DOTS_AFTER_LINE_BREAKS,
            shouldPlaceDotsAfterLineBreaks
          );
        },
      })),
    ]),
  ]);
  return element;
});

module.exports = AdvancedOptions;
