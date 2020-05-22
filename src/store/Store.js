const simpleState = include('src/libs/simpleState/SimpleState.js');

const { state, setState, addStateChangeListener } = simpleState({
  queryInput: '',
  queryOutput: '',
  currentRoute: '/',
});

const getQueryInput = () => state.queryInput;
const setQueryInput = (queryInput) => setState({ queryInput });

const getQueryOutput = () => state.queryOutput;
const setQueryOutput = (queryOutput) => setState({ queryOutput });

const getCurrentRoute = () => state.currentRoute;
const setCurrentRoute = (currentRoute) => setState({ currentRoute });

module.exports = {
  addStateChangeListener,
  getQueryInput,
  setQueryInput,
  getQueryOutput,
  setQueryOutput,
  getCurrentRoute,
  setCurrentRoute,
};
