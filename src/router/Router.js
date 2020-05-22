const SimpleRouter = include('src/libs/simpleRouter/SimpleRouter.js');

const router = new SimpleRouter({
  '/': 'Gremlint - Gremlin query formatter',
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
