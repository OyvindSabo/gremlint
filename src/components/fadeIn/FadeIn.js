const { html } = include('src/libs/simpleHTML/SimpleHTML.js');

const FadeIn = (getProps, children) => {
  let opacity = 0;

  const element = html(
    'div',
    () => ({
      style: `opacity: ${opacity};
              transition: 0.25s;`,
    }),
    children
  );

  setTimeout(() => {
    opacity = 1;
    element.update();
  });

  return element;
};

module.exports = FadeIn;
