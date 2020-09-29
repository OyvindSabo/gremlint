const createReducedState = ({ initialState, reducers, routines }) => {
  let state = initialState;
  let subscribedElements = [];
  let changeListeners = [];

  Object.entries(reducers).forEach(([action, reducer]) => {
    window.addEventListener(action, (event) => {
      const nextState = reducer(state, event.detail);
      state = nextState;
      subscribedElements.forEach((subscriber) => subscriber.update());
      changeListeners.forEach((changeListener) => changeListener(state));
    });
  });

  Object.entries(routines).forEach(([action, routine]) => {
    window.addEventListener(action, (event) => {
      routine(state, event.detail);
    });
  });

  const getState = () => state;

  const provider = (getComponent) => {
    const providedComponent = (...props) => {
      const htmlElement = getComponent(getState)(...props);
      subscribedElements = [...subscribedElements, htmlElement];
      return htmlElement;
    };
    return providedComponent;
  };

  const addChangeListener = (changeListener) => {
    changeListeners = [...changeListeners, changeListener];
  };

  return { provider, getState, addChangeListener };
};

const dispatch = (action, payload) => {
  window.dispatchEvent(new CustomEvent(action, { detail: payload }));
};

module.exports = { createReducedState, dispatch };
