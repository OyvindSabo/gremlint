const App = require('./app/App.js');
const Store = require('./store/Store.js');
const Router = require('./router/Router.js');

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
