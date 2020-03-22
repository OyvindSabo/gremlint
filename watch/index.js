const { buildToHtml } = require('../build/build');

const rebuild = () => {
  buildToHtml();
  setTimeout(() => {
    rebuild();
  }, 1000);
};
rebuild();
