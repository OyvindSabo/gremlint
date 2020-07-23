const {
  TextColor,
  InputTextColor,
  HighlightedTextColor,
  DisabledTextColor,
  HighlightColor,
  White,
} = include('src/libs/simpleColorPalette/SimpleColorPalette.js');

// A unit is 20px
const getInlineContainerStyle = (widthUnits, heightUnits) => `
  display: inline-block;
  padding: 10px;
  box-sizing: border-box;
  height: ${heightUnits * 20}px;
  width: ${widthUnits * 20}px;
`;

const getInputStyle = () => `
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.05);
  outline: none;
  font-size: 15px;
  padding: 10px;
  border: none;
  box-shadow: inset rgba(0, 0, 0, 0.5) 0 0 10px -5px;
  color: ${InputTextColor};
`;

// Used for links
// inline-block is needed for the element to be able to have a height
const getLinkStyle = (isHovered, isSelected) => `
  text-decoration: none;
  display: inline-block;
  height: 20px;
  line-height: 20px;
  font-size: 15px;
  color: ${isHovered || isSelected ? HighlightedTextColor : TextColor};
  border-bottom: ${isSelected ? `2px solid ${HighlightColor}` : 'none'};
`;

// Used for buttons to make them look like text
const getTextButtonStyle = (isHovered) => `
  height: 20px;
  line-height: 20px;
  font-size: 15px;
  color: ${isHovered ? HighlightedTextColor : TextColor};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  outline: none;
`;

// Used for spans and divs and what not
const getTextStyle = () => `
  height: 20px;
  line-height: 20px;
  font-size: 15px;
  color: ${TextColor};
`;

module.exports = {
  getInlineContainerStyle,
  getInputStyle,
  getLinkStyle,
  getTextButtonStyle,
  getTextStyle,
};
