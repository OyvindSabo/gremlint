const NavigationButton = include(
  'src/components/navigationButton/NavigationButton.js'
);
const QueryInput = include('src/components/queryInput/QueryInput.js');
const Spacer = include('src/components/spacer/Spacer.js');
const StyleGuideRule = include(
  'src/components/styleGuideRule/StyleGuideRule.js'
);
const { compose, Each, If } = include('src/libs/simpleHTML/SimpleHTML.js');
const { getCurrentRoute } = include('src/router/Router.js');
const { getQueryInput, setQueryInput } = include('src/store/Store.js');
const { rules } = include('src/views/styleGuide/rules/Rules.js');

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
    If(
      () => getCurrentRoute() === '/style-guide',
      () => [
        compose('div', {}, [
          Each(
            () => rules,
            (getCurrentValue) => [
              StyleGuideRule(() => ({
                title: getCurrentValue().title,
                explanation: getCurrentValue().explanation,
                example: getCurrentValue().example,
              })),
            ]
          ),
        ]),
      ]
    ),
  ]);
  return element;
};

module.exports = App;
