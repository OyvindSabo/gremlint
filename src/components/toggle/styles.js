const { BorderColor, HighlightedTextColor, TextColor, White } = include(
  'src/libs/simpleColorPalette/SimpleColorPalette.js'
);

const getToggleContainerStyle = (width, height) => `
  display: inline-block;
  height: ${height};
  width: ${width};
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.05);
  box-shadow: inset rgba(0, 0, 0, 0.5) 0 0 10px -5px;
  position: relative;
`;

const getOptionStyle = (width, height) => `
  cursor: pointer;
  display: inline-block;
  height: ${height};
  width: calc(${width} / 2);
  box-sizing: border-box;
  padding: 10px;
  line-height: 20px;
  font-size: 16px;
  color: ${TextColor};
  text-align: center;
`;

const getSelectedOptionStyle = (checked) => `
  background: ${White};
  cursor: pointer;
  display: inline-block;
  position: absolute;
  top: 0;
  left: ${checked ? '160px' : '0'};
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
  transition: 0.5s;
`;

module.exports = {
  getToggleContainerStyle,
  getOptionStyle,
  getSelectedOptionStyle,
};
