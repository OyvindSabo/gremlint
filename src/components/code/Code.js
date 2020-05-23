const { compose } = include('src/libs/simpleHTML/SimpleHTML.js');
const { TextColor } = include(
  'src/libs/simpleColorPalette/SimpleColorPalette.js'
);

const getCodeStyle = () => `
  border-radius: 5px;
  font-family: "Courier New", Courier, monospace;
  background: rgba(0, 0, 0, 0.05);
  outline: none;
  font-size: 15px;
  padding: 10px;
  border: none;
  resize: none;
  width: 100%;
  box-shadow: inset rgba(0, 0, 0, 0.5) 0 0 10px -5px;
  white-space: pre-wrap;
`;

const Code = (getProps) => {
  const getInnerText = () => getProps().innerText;
  const element = compose('div', { style: 'padding: 10px;' }, [
    compose('div', { style: getCodeStyle() }, [
      compose(
        'span',
        {
          style: `color: ${TextColor}; line-height: 20px; font-size: 15px;`,
          innerText: getInnerText(),
        },
        []
      ),
    ]),
  ]);
  return element;
};

module.exports = Code;
