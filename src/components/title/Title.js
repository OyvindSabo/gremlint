const { html } = include('src/libs/simpleHTML/SimpleHTML.js');
const { TextColor } = include(
  'src/libs/simpleColorPalette/SimpleColorPalette.js'
);

const Title = (getProps) => {
  const getInnerText = () => getProps().innerText;
  const element = html(
    'div',
    { style: getInnerText() ? 'padding: 10px;' : '' },
    [
      html(
        'span',
        {
          style: `color: ${TextColor}; line-height: 30px; font-size: 25px;`,
          innerText: getInnerText(),
        },
        []
      ),
    ]
  );
  return element;
};

module.exports = Title;
