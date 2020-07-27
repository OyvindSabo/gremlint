const { html } = include('src/libs/simpleHTML/SimpleHTML.js');
const { White } = include('src/libs/simpleColorPalette/SimpleColorPalette.js');
const NavigationButton = include(
  'src/components/navigationButton/NavigationButton.js'
);

const getQueryFormatterButtonProps = (getCurrentRoute) => () => ({
  isSelected: getCurrentRoute() === '/',
  label: 'Query formatter',
  href: '#!/',
});

const getStyleGuideButtonProps = (getCurrentRoute) => () => ({
  isSelected: getCurrentRoute() === '/style-guide',
  label: 'Style guide',
  href: '#!/style-guide',
});

const Navigator = (getProps) => {
  const getCurrentRoute = () => getProps().currentRoute;
  const element = html('div', {}, [
    html(
      'div',
      {
        style: `background: ${White};
                box-shadow: ${White} 0 0 10px;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                z-index: 1;`,
      },
      [
        html(
          'div',
          {
            style:
              'width: min(800px, 100vw); margin-left: calc(50vw - min(400px, 50vw));',
          },
          [
            NavigationButton(getQueryFormatterButtonProps(getCurrentRoute)),
            NavigationButton(getStyleGuideButtonProps(getCurrentRoute)),
          ]
        ),
      ]
    ),
    html('div', { style: 'height:40px;' }, []),
  ]);
  return element;
};

module.exports = Navigator;
