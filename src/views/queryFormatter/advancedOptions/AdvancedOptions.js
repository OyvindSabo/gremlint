const { html } = include('src/libs/simpleHTML/SimpleHTML.js');
const {
  getIndentation,
  setIndentation,
  getMaxLineLength,
  setMaxLineLength,
  getShouldPlaceDotsAfterLineBreaks,
  setShouldPlaceDotsAfterLineBreaks,
} = include('src/store/Store.js');
const {
  getInlineContainerStyle,
  getInputStyle,
  getRadioInputStyle,
  getTextStyle,
} = include('src/libs/simpleStyle/SimpleStyle.js');

const AdvancedOptions = () => {
  const element = html('div', {}, [
    html('form', {}, [
      html('div', { style: 'padding: 10px' }, [
        html(
          'span',
          {
            innerText: 'Indentation:',
            style: getTextStyle() + getInlineContainerStyle(8, 2),
          },
          []
        ),
        html(
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
      html('div', { style: 'padding: 10px; display;' }, [
        html(
          'span',
          {
            innerText: 'Max line length:',
            style: getTextStyle() + getInlineContainerStyle(8, 2),
          },
          []
        ),
        html(
          'input',
          () => ({
            style: getInputStyle() + getInlineContainerStyle(8, 2),
            type: 'number',
            min: 0,
            value: getMaxLineLength(),
            oninput: ({ target }) => setMaxLineLength(target.value),
          }),
          []
        ),
      ]),
      html('div', { style: 'padding: 10px;' }, [
        html('span', { style: getInlineContainerStyle(2, 2) }, [
          html(
            'input',
            () => ({
              style: getRadioInputStyle(),
              type: 'radio',
              value: 'false',
              name: 'shouldPlaceDotsAfterLineBreaks',
              onclick: () => setShouldPlaceDotsAfterLineBreaks(false),
              checked: !getShouldPlaceDotsAfterLineBreaks(),
            }),
            []
          ),
        ]),
        html(
          'span',
          {
            innerText: 'Place dots before line breaks',
            style: getTextStyle() + getInlineContainerStyle(14, 2),
            onclick: () => setShouldPlaceDotsAfterLineBreaks(false),
          },
          []
        ),
      ]),
      html('div', { style: 'padding: 10px' }, [
        html('span', { style: getInlineContainerStyle(2, 2) }, [
          html(
            'input',
            () => ({
              style: getRadioInputStyle(),
              type: 'radio',
              value: 'true',
              name: 'shouldPlaceDotsAfterLineBreaks',
              onclick: () => setShouldPlaceDotsAfterLineBreaks(true),
              checked: getShouldPlaceDotsAfterLineBreaks(),
            }),
            []
          ),
        ]),
        html(
          'span',
          {
            innerText: 'Place dots after line breaks',
            style: getTextStyle() + getInlineContainerStyle(14, 2),
            onclick: () => setShouldPlaceDotsAfterLineBreaks(true),
          },
          []
        ),
      ]),
    ]),
  ]);
  return element;
};

module.exports = AdvancedOptions;
