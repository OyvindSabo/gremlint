const Observable = include('src/libs/observable/Observable.js');

function Router(routes) {
  /**
   * @param {string} routes
   */
  this.setRoutes = function (routes) {
    Object.entries(routes).forEach(([route, title]) => {
      this.routes[route] = route;
      this.titles[route] = title;
      if (route === '/') {
        this.routes[''] = route;
        this.titles[''] = title;
      }
    });
    this.syncWithHash();
  };
  Router.getTokens = function (hash) {
    return hash
      .split('/')
      .filter(Boolean)
      .filter((element) => element !== '#')
      .filter((element) => element !== '#!');
  };
  /**
   * @param {string} token
   * @returns {boolean}
   */
  Router.isParameterRouteToken = function (token) {
    if (
      token.indexOf('<') !== 0 ||
      !token.slice(2, -4).includes(':') ||
      token.indexOf('>') !== token.length - 1
    ) {
      return false;
    }
    const [parameter, type] = token
      .slice(token.indexOf('<') + 1, token.indexOf('>'))
      .split(':');

    if (!['int', 'string', 'number'].includes(type)) {
      return false;
    }
    return true;
  };
  Router.appendTokenToHash = function (hash, token) {
    return `${hash}/${token}`;
  };
  Router.parseParameterRouteToken = function (token) {
    const [parameter, type] = token
      .slice(token.indexOf('<') + 1, token.indexOf('>'))
      .split(':');
    return {
      parameter,
      type,
    };
  };
  // (hash: string, route: string) => false | { [key: string]: number | string }
  Router.getMatch = function (hash, route) {
    const hashTokens = Router.getTokens(hash);
    const routeTokens = Router.getTokens(route);
    const params = {};
    let reconstructedHash = '#!';
    if (hashTokens.length !== routeTokens.length) return false;
    for (let i of Object.keys(hashTokens)) {
      const hashToken = hashTokens[i];
      const routeToken = routeTokens[i];
      if (Router.isParameterRouteToken(routeToken)) {
        const { parameter, type } = Router.parseParameterRouteToken(routeToken);
        if (type === 'int') {
          if (!Router.isInt(hashToken)) return false;
          params[parameter] = parseInt(hashToken);
          reconstructedHash = Router.appendTokenToHash(
            reconstructedHash,
            hashToken
          );
        } else if (type === 'number' && !Router.isNumber(hasToken)) {
          if (!Router.isNumber(hashToken)) return false;
          params[parameter] = Number(hashToken);
          reconstructedHash = Router.appendTokenToHash(
            reconstructedHash,
            hashToken
          );
        } else if (type === 'string') {
          params[parameter] = hashToken;
          reconstructedHash = Router.appendTokenToHash(
            reconstructedHash,
            hashToken
          );
        }
      } else {
        if (hashToken !== routeToken) return false;
        reconstructedHash = Router.appendTokenToHash(
          reconstructedHash,
          hashToken
        );
      }
    }
    return { params, reconstructedHash };
  };
  Router.getRouteAndParamsFromHash = function (hash, routes) {
    for (let route of Object.keys(routes)) {
      const match = Router.getMatch(hash, route);
      if (match) {
        const { params, reconstructedHash } = match;
        return { route, params, reconstructedHash };
      }
    }
    return { route: '', params: {}, reconstructedHash: '' };
  };
  /**
   * @param {Object.<string, number | string>} params
   */
  this.setParams = function (params) {
    this.params = params;
    // Todo: Maybe dispatch some kind of event
  };
  this.setCurrentRoute = function (route) {
    this.currentRoute$.value = route;
  };
  this.setCurrentTitle = function (title) {
    this.currentTitle = title;
  };
  Router.removeHash = function () {
    return history.replaceState(null, null, ' ');
  };
  // Rather than passing data, this one should pass a string saying which attribute has been updated
  this.emit = function () {
    this.observers.forEach((observer) => {
      if (!observer)
        console.warn('Non-existing element registered as router observer');

      observer({ currentRoute$: this.currentRoute$, params: this.params });
    });
  };
  this.syncWithHash = function () {
    const { hash } = location;
    const {
      route,
      params,
      reconstructedHash,
    } = Router.getRouteAndParamsFromHash(hash, this.routes);
    this.setParams(params);
    this.setCurrentRoute(this.routes[route]);
    this.setCurrentTitle(this.titles[route]);
    if (reconstructedHash === '#!') {
      Router.removeHash();
    } else {
      history.replaceState(undefined, undefined, reconstructedHash);
    }
    document.title = this.currentTitle;
    this.emit();
  };
  this.params = {};
  this.currentRoute$ = new Observable('');
  this.routes = {};
  this.titles = {};
  this.observers = [];
  this.hashChangeListeners = [];
  this.setRoutes(routes);
  window.addEventListener('hashchange', () => {
    this.syncWithHash();
    this.callHashChangeListeners();
  });
  /**
   * @param {string} route
   * One of the registered routes, without hashbang
   */
  this.navigateTo = (route) => {
    location.hash = `#!${route}`;
  };

  this.refresh = () => this.syncWithHash();

  // @possiblyNumber: string
  Router.isNumber = function (possiblyNumber) {
    return !isNaN(Number(possiblyNumber));
  };
  Router.isInt = function (possiblyInt) {
    return (
      Router.isNumber(possiblyInt) &&
      parseInt(possiblyInt) === Number(possiblyInt)
    );
  };
  this.onHashChange = (callback) => {
    this.hashChangeListeners.push(callback);
    this.callHashChangeListeners();
  };
  this.callHashChangeListeners = function () {
    this.hashChangeListeners.forEach((hashChangeListener) =>
      hashChangeListener({
        params: this.params,
        currentRoute$: this.currentRoute$,
      })
    );
  };
  this.getParams = () => this.params;
  this.getCurrentTitle = () => this.currentTitle;
  Router.isProp = (propsOrChild) =>
    !(propsOrChild instanceof HTMLElement || typeof propsOrChild === 'string');

  /**
   * @param {function({ params: Object.<string, string | number> }): void} observer
   */
  this.subscribe = (observer) => {
    observer({
      currentRoute$: this.currentRoute$,
      params: this.params,
    });
    this.observers.push(observer);
  };
}

module.exports = Router;
