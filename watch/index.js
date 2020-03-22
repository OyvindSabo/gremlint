const { build } = require('../build/build');

const rebuild = () => {
  build();
  setTimeout(() => {
    rebuild();
  }, 1000);
};
rebuild();
