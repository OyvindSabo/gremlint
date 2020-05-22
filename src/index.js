const SimpleRouter = include('src/libs/simpleRouter/SimpleRouter.js');
const Observable = include('src/libs/observable/Observable.js');
const App = include('src/app/App.js');
const Store = include('src/store/Store.js');

const router = new SimpleRouter({
  '/': 'Gremlint - Gremlin query formatter',
  '/style-guide': 'Gremlint - Style guide',
});

const app = App(() => ({}));

Object.assign(document.body.style, {
  fontFamily: 'Sans-Serif',
  margin: '0px',
});

document.body.appendChild(app);
