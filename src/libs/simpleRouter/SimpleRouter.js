function SimpleRouter(routes) {
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
  SimpleRouter.getTokens = function (hash) {
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
  SimpleRouter.isParameterRouteToken = function (token) {
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
  SimpleRouter.appendTokenToHash = function (hash, token) {
    return `${hash}/${token}`;
  };
  SimpleRouter.parseParameterRouteToken = function (token) {
    const [parameter, type] = token
      .slice(token.indexOf('<') + 1, token.indexOf('>'))
      .split(':');
    return {
      parameter,
      type,
    };
  };
  // (hash: string, route: string) => false | { [key: string]: number | string }
  SimpleRouter.getMatch = function (hash, route) {
    const hashTokens = SimpleRouter.getTokens(hash);
    const routeTokens = SimpleRouter.getTokens(route);
    const params = {};
    let reconstructedHash = '#!';
    if (hashTokens.length !== routeTokens.length) return false;
    for (let i of Object.keys(hashTokens)) {
      const hashToken = hashTokens[i];
      const routeToken = routeTokens[i];
      if (SimpleRouter.isParameterRouteToken(routeToken)) {
        const { parameter, type } = SimpleRouter.parseParameterRouteToken(
          routeToken
        );
        if (type === 'int') {
          if (!Router.isInt(hashToken)) return false;
          params[parameter] = parseInt(hashToken);
          reconstructedHash = SimpleRouter.appendTokenToHash(
            reconstructedHash,
            hashToken
          );
        } else if (type === 'number' && !Router.isNumber(hasToken)) {
          if (!Router.isNumber(hashToken)) return false;
          params[parameter] = Number(hashToken);
          reconstructedHash = SimpleRouter.appendTokenToHash(
            reconstructedHash,
            hashToken
          );
        } else if (type === 'string') {
          params[parameter] = hashToken;
          reconstructedHash = SimpleRouter.appendTokenToHash(
            reconstructedHash,
            hashToken
          );
        }
      } else {
        if (hashToken !== routeToken) return false;
        reconstructedHash = SimpleRouter.appendTokenToHash(
          reconstructedHash,
          hashToken
        );
      }
    }
    return { params, reconstructedHash };
  };
  SimpleRouter.getRouteAndParamsFromHash = function (hash, routes) {
    for (let route of Object.keys(routes)) {
      const match = SimpleRouter.getMatch(hash, route);
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
    this.currentRoute = route;
  };
  this.setCurrentTitle = function (title) {
    this.currentTitle = title;
  };
  SimpleRouter.removeHash = function () {
    return history.replaceState(null, null, ' ');
  };
  this.syncWithHash = function () {
    const { hash } = location;
    const {
      route,
      params,
      reconstructedHash,
    } = SimpleRouter.getRouteAndParamsFromHash(hash, this.routes);
    this.setParams(params);
    this.setCurrentRoute(this.routes[route]);
    this.setCurrentTitle(this.titles[route]);
    if (reconstructedHash === '#!') {
      SimpleRouter.removeHash();
    } else {
      history.replaceState(undefined, undefined, reconstructedHash);
    }
    document.title = this.currentTitle;
  };
  this.params = {};
  this.currentRoute = '';
  this.routes = {};
  this.titles = {};
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
  SimpleRouter.isNumber = function (possiblyNumber) {
    return !isNaN(Number(possiblyNumber));
  };
  SimpleRouter.isInt = function (possiblyInt) {
    return (
      SimpleRouter.isNumber(possiblyInt) &&
      parseInt(possiblyInt) === Number(possiblyInt)
    );
  };
  this.addHashChangeListener = (callback) => {
    this.hashChangeListeners.push(callback);
    this.callHashChangeListeners();
  };
  this.callHashChangeListeners = () => {
    this.hashChangeListeners.forEach((hashChangeListener) =>
      hashChangeListener({
        params: this.params,
        currentRoute: this.currentRoute,
      })
    );
  };
  this.getParams = () => this.params;
  this.getCurrentTitle = () => this.currentTitle;
  SimpleRouter.isProp = (propsOrChild) =>
    !(propsOrChild instanceof HTMLElement || typeof propsOrChild === 'string');
}

module.exports = SimpleRouter;
