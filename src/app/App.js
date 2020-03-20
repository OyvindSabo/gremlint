//const { CenteredContainer } = include('src/components/centeredContainer/CenteredContainer.js');
const { Observable } = include('src/libraries/observable/Observable.js');

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

const createElement$ = (elementType, ...observables) => {
  const element = document.createElement(elementType);
  observables.flat().forEach(observable => {
    if (
      // If it is observable value
      observable instanceof Observable &&
      ['string', 'number'].includes(typeof observable.value)
    ) {
      const textNode = document.createTextNode(observable.value);
      element.appendChild(textNode);
      window.addEventListener(observable.id, ({ detail }) => {
        textNode.nodeValue = detail;
      });
      return;
    }
    if (
      // If it is non-observable value
      ['string', 'number'].includes(typeof observable)
    ) {
      const textNode = document.createTextNode(observable);
      element.appendChild(textNode);
      return;
    }
    // If it is a dom node
    element.appendChild(observable);
  });
  // Note that styleObject$ is an object with observable values, not an observable object
  // TODO: It should also be possible to set the style as a non-observable object
  element.setStyle = styleObject$ => {
    Object.entries(styleObject$).forEach(([styleProperty, styleValue$]) => {
      if (styleValue$ instanceof Observable) {
        element.style[styleProperty] = styleValue$.value;
        window.addEventListener(styleValue$.id, ({ detail }) => {
          element.style[styleProperty] = detail;
        });
        return;
      }
      element.style[styleProperty] = styleValue$;
    });
    return element;
  };
  element.setProps = propsObject => {
    Object.entries(propsObject).forEach(([propKey, propValue$]) => {
      if (propValue$ instanceof Observable) {
        element[propKey] = propValue$.value;
        window.addEventListener(propValue$.id, ({ detail }) => {
          element[propKey] = detail;
        });
        return;
      }
      element[propKey] = propValue$;
    });
    return element;
  };
  element.onClick = clickCallback => {
    element.style.cursor = 'pointer';
    element.onclick = () => clickCallback(element);
    return element;
  };
  element.onMouseEnter = mouseEnterCallback => {
    element.onmouseenter = () => mouseEnterCallback(element);
    return element;
  };
  element.onMouseLeave = mouseLeaveCallback => {
    element.onmouseleave = () => mouseLeaveCallback(element);
    return element;
  };
  element.onInput = inputCallback => {
    element.addEventListener('input', () => inputCallback(element));
    return element;
  };
  return element;
};
const a$ = (...children) => createElement$('a', ...children);
const p$ = (...children) => createElement$('p', ...children);
const button$ = (...children) => createElement$('button', ...children);
const div$ = (...children) => createElement$('div', ...children);
const h1$ = (...children) =>
  createElement$('h1', ...children).setStyle({
    margin: '0',
    fontWeight: 'normal',
  });
const h2$ = (...children) =>
  createElement$('h2', ...children).setStyle({
    margin: '0',
    fontWeight: 'normal',
  });
const h3$ = (...children) =>
  createElement$('h3', ...children).setStyle({
    margin: '0',
    fontWeight: 'normal',
  });
const input$ = (value = '') => createElement$('input').setProps({ value });
const textArea$ = (value = '') =>
  createElement$('textarea').setProps({ value });
const br$ = () => createElement$('br');
const canvas$ = ({ width, height }) => {
  const element = createElement('canvas');
  element.width = width;
  element.height = height;
  return element;
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

const pipe = value => (...fns) => fns.reduce((value, fn) => fn(value), value);

const formatQuery = (query, config = { maxLineLength: 80 }) => pipe(query)();

const CenteredContainer = (...chilren) =>
  div$(...chilren).setStyle({ margin: 'auto', width: '720px' });

const ExpandableTextArea = value =>
  textArea$(value).onInput(textArea => {
    const previousClientHeight = textArea.clientHeight;
    const { scrollX, scrollY } = window;
    textArea.setStyle({ height: 'auto' });
    textArea.setStyle({ height: `${textArea.scrollHeight}px` });
    const newClientHeight = textArea.clientHeight;
    const scrollChange = newClientHeight - previousClientHeight;
    window.scrollTo(scrollX, scrollY + scrollChange);
  });

const QueryInput = value =>
  ExpandableTextArea(value).setStyle({
    borderRadius: '5px',
    fontFamily: '"Courier New", Courier, monospace',
    background: 'whiteSmoke',
    minHeight: '10em',
    overflow: 'hidden',
    outline: 'none',
    padding: '10px',
    border: 'none',
    resize: 'none',
    width: '100%',
  });

const QueryOutput = (...children) =>
  div$(...children).setStyle({
    fontFamily: '"Courier New", Courier, monospace',
    whiteSpace: 'pre-wrap',
    borderRadius: '5px',
    padding: '10px',
  });

const Navigator = (...children) =>
  div$(...children).setStyle({ padding: '10px 0', marginBottom: '20px' });

const NavigatorLink = ({ title, to }) =>
  a$(title)
    .setProps({ href: `#!${to}` })
    .setStyle({ marginRight: '20px' });

const CodeFormatter = ({ state }) =>
  div$(
    QueryInput(state.queryInput$).onInput(({ value }) => {
      state.queryInput$.value = value;
      state.queryOutput$.value = formatQuery(value);
    }),
    QueryOutput(state.queryOutput$)
  );

const testCases = [`g.V().hasLabel('application')`, `g.V().limit(10)`];
const TestCases = ({ state }) =>
  div$(
    ...testCases.map(query => {
      const formattedQuery = formatQuery(query);
      return div$(
        QueryOutput(query).setStyle({
          background: formattedQuery === query ? 'lightgreen' : 'lightpink',
        }),
        QueryOutput(formattedQuery)
      ).setStyle({
        marginBottom: '20px',
      });
    })
  );

const App = ({ state, currentRoute$ }) =>
  CenteredContainer(
    Navigator(
      NavigatorLink({ title: 'Query formatter', to: '/' }),
      NavigatorLink({ title: 'Test cases', to: '/test-cases' })
    ),
    Switch$(currentRoute$)(
      '/',
      CodeFormatter({ state }),
      '/test-cases',
      TestCases({ state })
    )
  );

module.exports = {
  App,
};
