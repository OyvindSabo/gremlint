const { compose } = include('src/libs/simpleHTML/SimpleHTML.js');
const { getInlineContainerStyle, getLinkStyle } = include(
  'src/libs/simpleStyle/SimpleStyle.js'
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

  const element = compose(
    'span',
    () => ({ style: getInlineContainerStyle(7, 2) }),
    [
      compose(
        'a',
        () => ({
          href: getHref(),
          innerText: getLabel(),
          style: getLinkStyle(getIsHovered(), getIsSelected()),
          onmouseenter: () => setIsHovered(true),
          onmouseleave: () => setIsHovered(false),
        }),
        []
      ),
    ]
  );

  return element;
};

module.exports = NavigationButton;
