const Observable = include('src/libraries/observable/Observable.js');

// Currently needs at least two arguments
const add$ = (...observables) => {
  const sum = observables
    .map(observable =>
      observable instanceof Observable ? observable.value : observable
    )
    .reduce((a, b) => a + b);
  const sum$ = new Observable(sum);
  observables.forEach(observable => {
    window.addEventListener(observable.id, ({ detail }) => {
      const sum = observables
        .map(observable =>
          observable instanceof Observable ? observable.value : observable
        )
        .reduce((a, b) => a + b);
      sum$.value = sum;
    });
  });
  return sum$;
};

// Currently needs at least two arguments
const subtract$ = (...observables) => {
  const difference = observables
    .map(observable =>
      observable instanceof Observable ? observable.value : observable
    )
    .reduce((a, b) => a - b);
  const difference$ = new Observable(difference);
  observables.forEach(observable => {
    window.addEventListener(observable.id, ({ detail }) => {
      const difference = observables
        .map(observable =>
          observable instanceof Observable ? observable.value : observable
        )
        .reduce((a, b) => a - b);
      difference$.value = difference;
    });
  });
  return difference$;
};

// Currently needs at least two arguments
const multiply$ = (...observables) => {
  const product = observables
    .map(observable =>
      observable instanceof Observable ? observable.value : observable
    )
    .reduce((a, b) => a * b);
  const product$ = new Observable(product);
  observables.forEach(observable => {
    window.addEventListener(observable.id, ({ detail }) => {
      const product = observables
        .map(observable =>
          observable instanceof Observable ? observable.value : observable
        )
        .reduce((a, b) => a * b);
      product$.value = product;
    });
  });
  return product$;
};

// Currently needs at least two arguments
const divide$ = (...observables) => {
  const quotient = observables
    .map(observable =>
      observable instanceof Observable ? observable.value : observable
    )
    .reduce((a, b) => a / b);
  const quotient$ = new Observable(quotient);
  observables.forEach(observable => {
    window.addEventListener(observable.id, ({ detail }) => {
      const quotient = observables
        .map(observable =>
          observable instanceof Observable ? observable.value : observable
        )
        .reduce((a, b) => a / b);
      quotient$.value = quotient;
    });
  });
  return quotient$;
};

const choose$ = (observable, option1, option2) => {
  const result$ = new Observable(
    (observable instanceof Observable
    ? observable.value
    : observable)
      ? option1 instanceof Observable
        ? option1.value
        : option1
      : option2 instanceof Observable
      ? option2.value
      : option2
  );
  [observable, option1, option2]
    .filter(observable => observable instanceof Observable)
    .forEach(observable => {
      window.addEventListener(observable.id, ({ detail }) => {
        // TODO: Make it possible to set a specific child of an observable
        result$.value = (observable instanceof Observable
        ? observable.value
        : observable)
          ? option1 instanceof Observable
            ? option1.value
            : option1
          : option2 instanceof Observable
          ? option2.value
          : option2;
      });
    });
  return result$;
};

const eq$ = (...observables) => {
  const equality = observables
    .map(observable =>
      observable instanceof Observable ? observable.value : observable
    )
    .every((element, _, array) => element === array[0]);
  const equality$ = new Observable(equality);
  observables
    .filter(observable => observable instanceof Observable)
    .forEach(observable => {
      window.addEventListener(observable.id, ({ detail }) => {
        const equality = observables
          .map(observable =>
            observable instanceof Observable ? observable.value : observable
          )
          .every((element, _, array) => element === array[0]);
        equality$.value = equality;
      });
    });
  return equality$;
};

const neq$ = (...observables) => {
  const inequality = !observables
    .map(observable =>
      observable instanceof Observable ? observable.value : observable
    )
    .every((element, _, array) => element === array[0]);
  const inequality$ = new Observable(inequality);
  observables
    .filter(observable => observable instanceof Observable)
    .forEach(observable => {
      window.addEventListener(observable.id, ({ detail }) => {
        const inequality = !observables
          .map(observable =>
            observable instanceof Observable ? observable.value : observable
          )
          .every((element, _, array) => element === array[0]);
        inequality$.value = inequality;
      });
    });
  return inequality$;
};

const gt$ = (value1$, value2$) => {
  const value1 = value1$ instanceof Observable ? value1$.value : value1$;
  const value2 = value2$ instanceof Observable ? value2$.value : value2$;

  const isGreaterThan$ = new Observable(value1 > value2);

  [value1$, value2$]
    .filter(observable => observable instanceof Observable)
    .forEach(observable => {
      window.addEventListener(observable.id, ({ detail }) => {
        const value1 = value1$ instanceof Observable ? value1$.value : value1$;
        const value2 = value2$ instanceof Observable ? value2$.value : value2$;

        isGreaterThan$.value = value1 > value2;
      });
    });
  return isGreaterThan$;
};

const lt$ = (value1$, value2$) => {
  const value1 = value1$ instanceof Observable ? value1$.value : value1$;
  const value2 = value2$ instanceof Observable ? value2$.value : value2$;

  const isLessThan$ = new Observable(value1 < value2);

  [value1$, value2$]
    .filter(observable => observable instanceof Observable)
    .forEach(observable => {
      window.addEventListener(observable.id, ({ detail }) => {
        const value1 = value1$ instanceof Observable ? value1$.value : value1$;
        const value2 = value2$ instanceof Observable ? value2$.value : value2$;

        isLessThan$.value = value1 < value2;
      });
    });
  return isLessThan$;
};

const not$ = observable => {
  const conditional =
    observable instanceof Observable ? observable.value : observable;
  const opposite$ = new Observable(!conditional);
  if (observable instanceof Observable) {
    window.addEventListener(observable.id, ({ detail }) => {
      opposite$.value = !detail;
    });
  }
  return opposite$;
};

const or$ = (...observables) => {
  const someTruthy = observables
    .map(observable =>
      observable instanceof Observable ? observable.value : observable
    )
    .some(Boolean);
  const someTruthy$ = new Observable(someTruthy);
  observables.forEach(observable => {
    window.addEventListener(observable.id, ({ detail }) => {
      const someTruthy = observables
        .map(observable =>
          observable instanceof Observable ? observable.value : observable
        )
        .some(Boolean);
      someTruthy$.value = someTruthy;
    });
  });
  return someTruthy$;
};

const slice$ = (stringOrArray$, start$, stop$) => {
  const stringOrArray =
    stringOrArray$ instanceof Observable
      ? stringOrArray$.value
      : stringOrArray$;
  const start = start$ instanceof Observable ? start$.value : start$;
  const stop = stop$ instanceof Observable ? stop$.value : stop$;
  const slicedStringOrArray$ = new Observable(stringOrArray.slice(start, stop));
  [stringOrArray$, start$, stop$]
    .filter(observable => observable instanceof Observable)
    .forEach(observable => {
      window.addEventListener(observable.id, ({ detail }) => {
        const stringOrArray =
          stringOrArray$ instanceof Observable
            ? stringOrArray$.value
            : stringOrArray$;
        const start = start$ instanceof Observable ? start$.value : start$;
        const stop = stop$ instanceof Observable ? stop$.value : stop$;
        slicedStringOrArray$.value = stringOrArray.slice(start, stop);
      });
    });
  return slicedStringOrArray$;
};

const split$ = (string$, separator$) => {
  const string = string$ instanceof Observable ? string$.value : string$;
  const separator =
    separator$ instanceof Observable ? separator$.value : separator$;
  const splitString$ = new Observable(string.split(separator));
  [string$, separator$]
    .filter(observable => observable instanceof Observable)
    .forEach(observable => {
      window.addEventListener(observable.id, ({ detail }) => {
        const string = string$ instanceof Observable ? string$.value : string$;
        const separator =
          separator$ instanceof Observable ? separator$.value : separator$;
        splitString$.value = string.split(separator);
      });
    });
  return splitString$;
};

const join$ = (array$, separator$) => {
  const array = array$ instanceof Observable ? array$.value : array$;
  const separator =
    separator$ instanceof Observable ? separator$.value : separator$;
  const joinedArray$ = new Observable(array.join(separator));
  [array$, separator$]
    .filter(observable => observable instanceof Observable)
    .forEach(observable => {
      window.addEventListener(observable.id, ({ detail }) => {
        const array = array$ instanceof Observable ? array$.value : array$;
        const separator =
          separator$ instanceof Observable ? separator$.value : separator$;
        joinedArray$.value = array.join(separator);
      });
    });
  return joinedArray$;
};

const length$ = stringOrArray$ => {
  const stringOrArray =
    stringOrArray$ instanceof Observable
      ? stringOrArray$.value
      : stringOrArray$;

  const length$ = new Observable(stringOrArray.length);
  if (stringOrArray$ instanceof Observable) {
    window.addEventListener(stringOrArray$.id, ({ detail }) => {
      length$.value = detail.length;
    });
  }
  return length$;
};

// This is not used and can probably be removed
const toArray$ = (...observables) => {
  const observableArray = observables.map(({ value }) => value);
  const array$ = new Observable(observableArray);
  observables.forEach((observable, i) => {
    window.addEventListener(observable.id, ({ detail }) => {
      // TODO: Make it possible to set a specific child of an observable
      array$.value = observables.map(({ value }) => value);
    });
  });
  return array$;
};

const Choose$ = (observable, element1, element2) => {
  let element = (observable instanceof Observable
  ? observable.value
  : observable)
    ? element1
    : element2;
  if (observable instanceof Observable) {
    window.addEventListener(observable.id, ({ detail }) => {
      // TODO: Make it possible to set a specific child of an observable
      newElement = (observable instanceof Observable
      ? observable.value
      : observable)
        ? element1
        : element2;

      if (newElement !== element) {
        element.parentNode.replaceChild(newElement, element);
        element = newElement;
      }
    });
  }
  return element;
};

const Switch$ = statement$ => (...clauses) => {
  const cases = clauses.filter((_, i) => i % 2 === 0);
  const elements = clauses.filter((_, i) => i % 2 !== 0);
  return cases.map((theCase, i) => {
    const element = elements[i];
    const display = element.style.display;
    return element.setStyle({
      display: choose$(eq$(statement$, theCase), display, 'none'),
    });
  });
};

const Nothing$ = () => div$().setStyle({ display: 'none' });

const If$ = (observable, element) => Choose$(observable, element, Nothing$());

const { div$ } = include('src/libraries/fakeReact/FakeReact.js');

const CenteredContainer = include(
  'src/components/centeredContainer/CenteredContainer.js'
);
const Navigator = include('src/components/navigator/Navigator.js');
const NavigatorLink = include('src/components/navigatorLink/NavigatorLink.js');
const QueryFormatter = include('src/views/queryFormatter/QueryFormatter.js');
const StyleGuide = include('src/views/styleGuide/StyleGuide.js');
const TestCases = include('src/views/testCases/TestCases.js');

const App = ({ state, currentRoute$ }) =>
  CenteredContainer(
    Navigator(
      NavigatorLink({ title: 'Query formatter', to: '/' }),
      NavigatorLink({ title: 'Style guide', to: '/style-guide' }),
      NavigatorLink({ title: 'Test cases', to: '/test-cases' })
    ),
    Switch$(currentRoute$)(
      '/',
      QueryFormatter({ state }),
      '/style-guide',
      StyleGuide(),
      '/test-cases',
      TestCases({ state })
    )
  );

module.exports = App;
