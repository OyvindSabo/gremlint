const Navigator = require('../components/navigator/Navigator.js');
const StyleGuide = require('../views/styleGuide/StyleGuide.js');
const QueryFormatter = require('../views/queryFormatter/QueryFormatter.js');
const LoadingAnimation = require('../components/loadingAnimation/LoadingAnimation.js');
const FadeIn = require('../components/fadeIn/FadeIn.js');
const { html, If } = require('../libs/simpleHTML/SimpleHTML.js');
const { getCurrentRoute } = require('../router/Router.js');

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
