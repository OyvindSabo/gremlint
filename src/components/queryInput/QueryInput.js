const { compose } = include('src/libs/simpleHTML/SimpleHTML.js');

const getQueryInputStyle = () => `
  height: calc(50vh - 60px);
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
`;

const QueryInput = (getProps) => {
  const getOnInput = () => getProps().oninput;
  const getValue = () => getProps().value;
  return compose(
    'textarea',
    () => ({
      oninput: getOnInput(),
      style: getQueryInputStyle(),
      value: getValue(),
    }),
    []
  );
};

module.exports = QueryInput;
