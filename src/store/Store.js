const Observable = include('src/libs/observable/Observable.js');

const queryInput$ = new Observable('');
const getQueryInput = () => queryInput$.value;
const setQueryInput = (queryInput) => {
  queryInput$.value = queryInput;
};
const addQueryInputChangeListener = (callback) => {
  addEventListener(queryInput$.id, callback);
};

const queryOutput$ = new Observable('');
const getQueryOutput = () => queryOutput$.value;
const setQueryOutput = (queryOutput) => {
  queryOutput$.value = queryOutput;
};
const addQueryOutputChangeListener = (callback) => {
  addEventListener(queryOutput$.id, callback);
};

module.exports = {
  getQueryInput,
  setQueryInput,
  addQueryInputChangeListener,
  getQueryOutput,
  setQueryOutput,
  addQueryOutputChangeListener,
};
