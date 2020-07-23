const Observable = include('src/libs/observable/Observable.js');
const { formatQuery } = include('src/libs/gremlint/Gremlint.js');

// Query input state
const queryInput$ = new Observable('');
const getQueryInput = () => queryInput$.value;
const setQueryInput = (queryInput) => {
  queryInput$.value = queryInput;
};
const addQueryInputChangeListener = (callback) => {
  addEventListener(queryInput$.id, callback);
};

// Query output state
const queryOutput$ = new Observable('');
const getQueryOutput = () => queryOutput$.value;
const setQueryOutput = (queryOutput) => {
  queryOutput$.value = queryOutput;
};
const addQueryOutputChangeListener = (callback) => {
  addEventListener(queryOutput$.id, callback);
};

// Show advanced options state
const showAdvancedOptions$ = new Observable(false);
const getShowAdvancedOptions = () => showAdvancedOptions$.value;
const setShowAdvancedOptions = (showAdvancedOptions) => {
  console.log('setting');
  showAdvancedOptions$.value = showAdvancedOptions;
};
const addShowAdvancedOptionsChangeListener = (callback) => {
  addEventListener(showAdvancedOptions$.id, callback);
};

addQueryInputChangeListener(({ detail }) => {
  setQueryOutput(formatQuery(detail));
});

module.exports = {
  getQueryInput,
  setQueryInput,
  addQueryInputChangeListener,

  getQueryOutput,
  setQueryOutput,
  addQueryOutputChangeListener,

  getShowAdvancedOptions,
  setShowAdvancedOptions,
  addShowAdvancedOptionsChangeListener,
};
