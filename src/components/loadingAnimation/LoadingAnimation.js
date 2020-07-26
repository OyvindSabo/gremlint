const { compose } = include('src/libs/simpleHTML/SimpleHTML.js');
const { White } = include('src/libs/simpleColorPalette/SimpleColorPalette.js');

const LoadingAnimation = (getProps) => {
  let loadingCompletion = 0;
  const getLoadingCompletion = () => loadingCompletion;
  console.log(getProps);
  const getOnLoadingComplete = () => getProps().onLoadingComplete;

  const element = compose(
    'div',
    () => ({
      style: `display: ${getLoadingCompletion() === 100 ? 'none' : 'initial'};
              position: fixed;
              background: ${White};
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              z-index: 2;
              `,
    }),
    [
      compose(
        'div',
        () => ({
          style: `height: 100%; width: 100%; position: absolute; top: 25vmin;`,
        }),
        [
          compose(
            'img',
            () => ({
              src:
                'http://gremlint.com/wp-content/uploads/2020/07/Lowpoly-Gremlin-512x512-1.png',
              style: `height: 50vmin; width: 50vmin; display: block; margin: auto;`,
            }),
            []
          ),
        ]
      ),
      compose(
        'div',
        () => ({
          style: `overflow: hidden;
                  height: ${(100 - loadingCompletion) / 2}vmin;
                  width: 100%; position: absolute;
                  top: 25vmin;`,
        }),
        [
          compose(
            'img',
            () => ({
              src:
                'http://gremlint.com/wp-content/uploads/2020/07/Lowpoly-Gremlin-Greyscale-512x512-1.png',
              style: `height: 50vmin; width: 50vmin; display: block; margin: auto;`,
            }),
            []
          ),
        ]
      ),
    ]
  );
  const load = () => {
    setTimeout(() => {
      if (loadingCompletion < 100) {
        loadingCompletion++;
        element.update();
        load();
      } else {
        getOnLoadingComplete()();
      }
    }, 10);
  };
  load();
  return element;
};

module.exports = LoadingAnimation;
