const Observable = include('src/libs/observable/Observable.js');
const App = include('src/app/App.js');
const Store = include('src/store/Store.js');
const Router = include('src/router/Router.js');

const app = App(() => ({}));

Router.addHashChangeListener(app.update);
Store.addQueryInputChangeListener(app.update);
Store.addQueryOutputChangeListener(app.update);
Store.addShowAdvancedOptionsChangeListener(app.update);
Store.addIndentationChangeListener(app.update);
Store.addMaxLineLengthChangeListener(app.update);
Store.addShouldPlaceDotsAfterLineBreaksChangeListener(app.update);

Object.assign(document.body.style, {
  fontFamily: 'Sans-Serif',
  margin: '0',
});

document.body.appendChild(app);
