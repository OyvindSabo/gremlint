const SimpleRouter = require('../libs/simpleRouter/SimpleRouter.js');

const router = new SimpleRouter({
  '/': 'Gremlint - Query formatter',
  '/style-guide': 'Gremlint - Style guide',
});

const getCurrentRoute = () => router.currentRoute;
const addHashChangeListener = (hashChangeListener) => {
  router.addHashChangeListener(hashChangeListener);
};

module.exports = {
  getCurrentRoute,
  addHashChangeListener,
};
