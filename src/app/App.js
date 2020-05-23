const Navigator = include('src/components/navigator/Navigator.js');
const StyleGuide = include('src/views/styleGuide/StyleGuide.js');
const QueryFormatter = include('src/views/queryFormatter/QueryFormatter.js');
const { compose, If } = include('src/libs/simpleHTML/SimpleHTML.js');
const { getCurrentRoute } = include('src/router/Router.js');

const App = () => {
  const element = compose('div', {}, [
    Navigator(() => ({ currentRoute: getCurrentRoute() })),

    compose('div', () => ({}), [
      compose(
        'div',
        { style: 'width: 800px; margin-left: calc(50vw - 400px);' },
        [
          If(
            () => getCurrentRoute() === '/',
            () => [QueryFormatter(() => ({}))]
          ),
          If(
            () => getCurrentRoute() === '/style-guide',
            () => [StyleGuide(() => ({}))]
          ),
        ]
      ),
    ]),
  ]);
  return element;
};

module.exports = App;
