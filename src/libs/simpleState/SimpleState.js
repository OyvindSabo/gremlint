const simpleState = (initialState) => {
  const state = initialState;
  const stateChangeCallbacks = [];
  const emit = () => {
    stateChangeCallbacks.forEach((stateChangeCallback) => {
      stateChangeCallback({ state, setState });
    });
  };
  const setState = (newState) => {
    Object.assign(state, newState);
    emit();
  };
  const addStateChangeListener = (stateChangeCallback) => {
    const element = { state, setState };
    stateChangeCallbacks.push(stateChangeCallback);
    return element;
  };
  return {
    state,
    setState,
    addStateChangeListener,
  };
};

module.exports = simpleState;
