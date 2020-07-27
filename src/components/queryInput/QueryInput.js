const { html } = include('src/libs/simpleHTML/SimpleHTML.js');
const { InputTextColor } = include(
  'src/libs/simpleColorPalette/SimpleColorPalette.js'
);

const getQueryInputStyle = () => `
  height: calc(100vh / 4);
  border-radius: 5px;
  font-family: "Courier New", Courier, monospace;
  background: rgba(0, 0, 0, 0.05);
  outline: none;
  font-size: 16px;
  padding: 10px;
  border: none;
  resize: none;
  width: 100%;
  box-shadow: inset rgba(0, 0, 0, 0.5) 0 0 10px -5px;
  color: ${InputTextColor};
  box-sizing: border-box;
`;

const QueryInput = (getProps) => {
  const getOnInput = () => getProps().oninput;
  const getValue = () => getProps().value;
  return html('div', { style: 'padding: 10px;' }, [
    html(
      'textarea',
      () => ({
        oninput: getOnInput(),
        style: getQueryInputStyle(),
        value: getValue(),
        rows: 20,
      }),
      []
    ),
  ]);
};

module.exports = QueryInput;
