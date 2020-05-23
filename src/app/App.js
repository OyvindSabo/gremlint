const NavigationButton = include(
  'src/components/navigationButton/NavigationButton.js'
);
const QueryInput = include('src/components/queryInput/QueryInput.js');
const Spacer = include('src/components/spacer/Spacer.js');
const { compose, If } = include('src/libs/simpleHTML/SimpleHTML.js');
const { getCurrentRoute } = include('src/router/Router.js');
const { getQueryInput, setQueryInput } = include('src/store/Store.js');

const getQueryFormatterButtonProps = () => ({
  isSelected: getCurrentRoute() === '/',
  label: 'Query formatter',
  href: '#!/',
});

const getStyleGuideButtonProps = () => ({
  isSelected: getCurrentRoute() === '/style-guide',
  label: 'Style guide',
  href: '#!/style-guide',
});

const getQueryInputProps = () => ({
  value: getQueryInput(),
  oninput: ({ target }) => setQueryInput(target.value),
});

const App = (getProps) => {
  const element = compose('div', { style: 'width: 800px; margin: auto;' }, [
    compose('div', { style: 'height: 40px' }, [
      NavigationButton(getQueryFormatterButtonProps),
      NavigationButton(getStyleGuideButtonProps),
    ]),
    Spacer(() => ({})),
    If(
      () => getCurrentRoute() === '/',
      () => [compose('div', {}, [QueryInput(getQueryInputProps)])]
    ),
  ]);
  return element;
};

module.exports = App;
