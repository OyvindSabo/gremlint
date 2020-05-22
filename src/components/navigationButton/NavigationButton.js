const { compose } = include('src/libs/simpleHTML/SimpleHTML.js');
const { HighlightedTextColor, TextColor, HighlightColor } = include(
  'src/libs/simpleColorPalette/SimpleColorPalette.js'
);

const NavigationButton = (getProps) => {
  let isHovered = false;

  const getIsHovered = () => isHovered;
  const setIsHovered = (value) => {
    isHovered = value;
    element.update();
  };

  const getIsSelected = () => getProps().isSelected;
  const getHref = () => getProps().href;
  const getLabel = () => getProps().label;

  const getSpanStyle = () => `
    display: inline-block;
    text-align: center;
    box-sizing: border-box;
    width: 160px;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    border-bottom: ${getIsSelected() ? `2px solid ${HighlightColor}` : 'none'};
  `;

  const getAStyle = () => `
    text-decoration: none;
    display: inline-block;
    width: 100%;
    color: ${
      getIsSelected() || getIsHovered() ? HighlightedTextColor : TextColor
    };
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
