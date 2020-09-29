const { createReducedState } = require('../../libs/simpleStore/SimpleStore.js');
const initialState = require('./initialState.js');
const reducers = require('./reducers.js');
const routines = require('./routines.js');

const store = createReducedState({ initialState, reducers, routines });

module.exports = store;
