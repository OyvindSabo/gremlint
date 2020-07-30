const Toggle = include('src/components/toggle/Toggle.js');
const { html } = include('src/libs/simpleHTML/SimpleHTML.js');
const {
  getIndentation,
  setIndentation,
  getMaxLineLength,
  setMaxLineLength,
  getShouldPlaceDotsAfterLineBreaks,
  setShouldPlaceDotsAfterLineBreaks,
} = include('src/store/Store.js');
const { BorderColor, HighlightedTextColor, TextColor, White } = include(
  'src/libs/simpleColorPalette/SimpleColorPalette.js'
);
const { getInlineContainerStyle, getInputStyle, getTextStyle } = include(
  'src/libs/simpleStyle/SimpleStyle.js'
);

const AdvancedOptions = () => {
  const element = html('div', {}, [
    html('div', { style: 'padding: 10px' }, [
      html('div', { innerText: 'Indentation', style: getTextStyle() }, []),
      html(
        'input',
        () => ({
          style: getInputStyle() + getInlineContainerStyle(16, 2),
          type: 'number',
          min: 0,
          max: getMaxLineLength(),
          value: getIndentation(),
          oninput: ({ target }) => setIndentation(target.value),
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
          min: getIndentation(),
          value: getMaxLineLength(),
          oninput: ({ target }) => setMaxLineLength(target.value),
        }),
        []
      ),
    ]),
    html('div', { style: 'padding: 10px;' }, [
      html('div', { innerText: 'Dot placement', style: getTextStyle() }, []),
      Toggle(() => ({
        height: '40px',
        width: '320px',
        checked: getShouldPlaceDotsAfterLineBreaks(),
        labels: {
          checked: 'After line break',
          unchecked: 'Before line break',
        },
        onchange: (checked) => setShouldPlaceDotsAfterLineBreaks(checked),
      })),
    ]),
  ]);
  return element;
};

module.exports = AdvancedOptions;
