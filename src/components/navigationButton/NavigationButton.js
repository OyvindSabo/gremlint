const { compose } = include('src/libs/simpleHTML/SimpleHTML.js');
const { HighlightedTextColor, TextColor, HighlightColor } = include(
  'src/libs/simpleColorPalette/SimpleColorPalette.js'
);

const NavigationButton = (getProps) => {
  const getIsSelected = () => getProps().isSelected;
  const getHref = () => getProps().href;
  const getLabel = () => getProps().label;

  let isHovered = false;
  const getIsHovered = () => isHovered;
  const setIsHovered = (value) => {
    isHovered = value;
    element.update();
  };

  const getSpanStyle = () => `
    display: inline-block;
    padding: 10px;
    box-sizing: border-box;
    width: 140px;
  `;

  const getAStyle = () => `
    text-decoration: none;
    display: inline-block;
    height: 20px;
    line-height: 20px;
    font-size: 15px;
    color: ${
      getIsSelected() || getIsHovered() ? HighlightedTextColor : TextColor
    };
    border-bottom: ${getIsSelected() ? `2px solid ${HighlightColor}` : 'none'};
  `;

  const element = compose('span', () => ({ style: getSpanStyle() }), [
    compose(
      'a',
      () => ({
        href: getHref(),
        innerText: getLabel(),
        style: getAStyle(),
        onmouseenter: () => setIsHovered(true),
        onmouseleave: () => setIsHovered(false),
      }),
      []
    ),
  ]);

  return element;
};

module.exports = NavigationButton;
