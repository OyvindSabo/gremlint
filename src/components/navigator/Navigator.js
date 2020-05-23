const { compose } = include('src/libs/simpleHTML/SimpleHTML.js');
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
  const element = compose('div', {}, [
    compose(
      'div',
      {
        style: `background: ${White};
                height: 40px;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;`,
      },
      [
        compose('div', { style: 'width: 800px; margin: auto;' }, [
          NavigationButton(getQueryFormatterButtonProps(getCurrentRoute)),
          NavigationButton(getStyleGuideButtonProps(getCurrentRoute)),
        ]),
      ]
    ),
    compose('div', { style: 'height:40px;' }, []),
  ]);
  return element;
};

module.exports = Navigator;
