const { Router } = include('src/libraries/router/Router.js');
const { Observable } = include('src/libraries/observable/Observable.js');
const { App } = include('src/app/App.js');

const router = new Router({
  '/': 'Gremlint - Gremlin query formatter',
  '/test-cases': 'Gremlint - Test cases',
});

const state = {
  queryInput$: new Observable(''),
  queryOutput$: new Observable(''),
};

Object.assign(document.body.style, {
  fontFamily: 'Sans-Serif',
  margin: '0px',
});

document.body.appendChild(App({ state, currentRoute$: router.currentRoute$ }));
