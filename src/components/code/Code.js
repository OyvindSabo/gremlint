const { html, If } = require('../../libs/simpleHTML/SimpleHTML.js');
const {
  DisabledTextColor,
  TextColor,
} = require('../../libs/simpleColorPalette/SimpleColorPalette.js');

const getCodeStyle = () => `
  border-radius: 5px;
  font-family: "Courier New", Courier, monospace;
  background: rgba(0, 0, 0, 0.05);
  outline: none;
  font-size: 15px;
  padding: 10px;
  border: none;
  resize: none;
  box-shadow: inset rgba(0, 0, 0, 0.5) 0 0 10px -5px;
  white-space: pre-wrap;
  overflow: auto;
`;

const Code = (getProps) => {
  const getInnerText = () => getProps().innerText;
  const getMaxLineLength = () => getProps().maxLineLength;
  const element = html('div', { style: 'padding: 10px;' }, [
    html('div', { style: getCodeStyle() + 'position: relative;' }, [
      html(
        'span',
        () => ({
          style: `color: ${TextColor}; line-height: 20px; font-size: 15px;`,
          innerText: getInnerText(),
        }),
        []
      ),
      If(
        () => getMaxLineLength() !== undefined,
        () => [
          html(
            'div',
            () => ({
              style: `top: 0;
                      left: 0;
                      width: calc(10px + ${getMaxLineLength()}ch);
                      border-right: 1px solid ${DisabledTextColor};
                      position: absolute;
                      height: 100%;
                      pointer-events: none;`,
            }),
            []
          ),
        ]
      ),
    ]),
  ]);
  return element;
};

module.exports = Code;
