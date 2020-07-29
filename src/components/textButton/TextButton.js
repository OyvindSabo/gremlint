const { html } = include('src/libs/simpleHTML/SimpleHTML.js');
const { getTextButtonStyle } = include('src/libs/simpleStyle/SimpleStyle.js');

const TextButton = (getProps) => {
  const getHref = () => getProps().href;
  const getLabel = () => getProps().label;
  const getOnClick = () => getProps().onclick;

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
  `;

  const element = html('span', () => ({ style: getSpanStyle() }), [
    html(
      'button',
      () => ({
        href: getHref(),
        innerText: getLabel(),
        style: getTextButtonStyle(getIsHovered()),
        onmouseenter: () => setIsHovered(true),
        onmouseleave: () => setIsHovered(false),
        onclick: getOnClick(),
      }),
      []
    ),
  ]);

  return element;
};

module.exports = TextButton;