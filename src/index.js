const App = require('./app/App.js');
const Router = require('./router/Router.js');

const app = App(() => ({}));

Router.addHashChangeListener(app.update);

Object.assign(document.body.style, {
  fontFamily: 'Sans-Serif',
  margin: '0',
});

document.body.appendChild(app);
