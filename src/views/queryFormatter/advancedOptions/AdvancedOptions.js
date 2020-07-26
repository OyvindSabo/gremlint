const { compose } = include('src/libs/simpleHTML/SimpleHTML.js');
const {
  getIndentation,
  setIndentation,
  getMaxLineLength,
  setMaxLineLength,
} = include('src/store/Store.js');
const { getInlineContainerStyle, getInputStyle, getTextStyle } = include(
  'src/libs/simpleStyle/SimpleStyle.js'
);

const AdvancedOptions = () => {
  const element = compose('div', {}, [
    compose('div', { style: 'padding: 10px;' }, [
      compose(
        'span',
        {
          innerText: 'Indentation:',
          style: getTextStyle() + getInlineContainerStyle(8, 2),
        },
        []
      ),
      compose(
        'input',
        () => ({
          style: getInputStyle() + getInlineContainerStyle(8, 2),
          type: 'number',
          min: 0,
          max: getMaxLineLength(),
          value: getIndentation(),
          oninput: ({ target }) => setIndentation(target.value),
        }),
        []
      ),
    ]),
    compose('div', { style: 'padding: 10px;' }, [
      compose(
        'span',
        {
          innerText: 'Max line length:',
          style: getTextStyle() + getInlineContainerStyle(8, 2),
        },
        []
      ),
      compose(
        'input',
        {
          style: getInputStyle() + getInlineContainerStyle(8, 2),
          type: 'number',
          min: 0,
          max: 85,
          value: getMaxLineLength(),
          oninput: ({ target }) => setMaxLineLength(target.value),
        },
        []
      ),
    ]),
  ]);
  return element;
};

module.exports = AdvancedOptions;
