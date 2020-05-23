const Observable = include('src/libs/observable/Observable.js');
const App = include('src/app/App.js');
const Store = include('src/store/Store.js');
const Router = include('src/router/Router.js');

const app = App(() => ({}));
Router.addHashChangeListener(app.update);
Store.addQueryInputChangeListener(app.update);

Object.assign(document.body.style, {
  fontFamily: 'Sans-Serif',
  margin: '0',
});

document.body.appendChild(app);
