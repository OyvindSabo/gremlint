const Navigator = include('src/components/navigator/Navigator.js');
const StyleGuide = include('src/views/styleGuide/StyleGuide.js');
const QueryFormatter = include('src/views/queryFormatter/QueryFormatter.js');
const LoadingAnimation = include(
  'src/components/loadingAnimation/LoadingAnimation.js'
);
const FadeIn = include('src/components/fadeIn/FadeIn.js');
const { html, If } = include('src/libs/simpleHTML/SimpleHTML.js');
const { getCurrentRoute } = include('src/router/Router.js');

const App = () => {
  let loadingComplete = false;
  const onLoadingComplete = () => {
    loadingComplete = true;
    element.update();
  };
  const element = If(
    () => loadingComplete,
    () => [
      FadeIn(() => ({}), [
        html('div', {}, [
          Navigator(() => ({ currentRoute: getCurrentRoute() })),
          html('div', {}, [
            html(
              'div',
              {
                style:
                  'width: min(800px, 100vw); margin-left: calc(50vw - min(400px, 50vw));',
              },
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
        ]),
      ]),
    ],
    () => [LoadingAnimation(() => ({ onLoadingComplete }))]
  );

  return element;
};

module.exports = App;
