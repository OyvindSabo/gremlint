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
  BorderColor,
  HighlightedTextColor,
  TextColor,
  InputTextColor,
  White,
} = include('src/libs/simpleColorPalette/SimpleColorPalette.js');
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
        html('span', { style: 'padding: 10px; display: inline-block' }, [
          html(
            'div',
            { innerText: 'Dot placement', style: getTextStyle() },
            []
          ),
          html(
            'span',
            {
              style: `display: inline-block;
                      height: 40px;
                      width: 320px;
                      border-radius: 5px;
                      background: rgba(0, 0, 0, 0.05);
                      box-shadow: inset rgba(0, 0, 0, 0.5) 0 0 10px -5px;
                      position: relative;`,
            },
            [
              html(
                'span',
                () => ({
                  style: `cursor: pointer;
                          display: inline-block;
                          height: 40px;
                          width: 160px;
                          box-sizing: border-box;
                          padding: 10px;
                          line-height: 20px;
                          font-size: 16px;
                          color: ${TextColor};
                          text-align: center;`,

                  innerText: 'Before line break',
                  onclick: () => setShouldPlaceDotsAfterLineBreaks(false),
                }),
                []
              ),
              html(
                'span',
                {
                  style: `cursor: pointer;
                          display: inline-block;
                          height: 40px;
                          width: 160px;
                          box-sizing: border-box;
                          padding: 10px;
                          line-height: 20px;
                          font-size: 16px;
                          color: ${TextColor};
                          text-align: center;`,

                  innerText: 'After line break',
                  onclick: () => setShouldPlaceDotsAfterLineBreaks(true),
                },
                []
              ),
              html(
                'span',
                () => ({
                  style: `background: ${White};
                          cursor: pointer;
                          display: inline-block;
                          position: absolute;
                          top: 0;
                          left: ${
                            getShouldPlaceDotsAfterLineBreaks() ? '160px' : '0'
                          };
                          height: 40px;
                          width: 160px;
                          border-radius: 5px;
                          box-sizing: border-box;
                          padding: 10px;
                          line-height: 20px;
                          font-size: 16px;
                          color: ${HighlightedTextColor};
                          text-align: center;
                          border: 1px solid ${BorderColor};
                          transition: 0.25s;`,

                  innerText: getShouldPlaceDotsAfterLineBreaks()
                    ? 'After line break'
                    : 'Before line break',
                }),
                []
              ),
            ]
          ),
        ]),
      ]),
    ]),
  ]);
  return element;
};

module.exports = AdvancedOptions;
