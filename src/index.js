const Observable = include('src/libs/observable/Observable.js');
const App = include('src/app/App.js');
const Store = include('src/store/Store.js');
const Router = include('src/router/Router.js');

const app = App(() => ({}));
Router.addHashChangeListener(app.update);

Object.assign(document.body.style, {
  fontFamily: 'Sans-Serif',
  margin: '0px',
});

document.body.appendChild(app);
