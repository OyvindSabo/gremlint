const { formatQuery } = require('../../libs/gremlint/Gremlint.js');

const {
  SET_QUERY_INPUT,
  FORMAT_QUERY,
  TOGGLE_SHOULD_SHOW_ADVANCED_OPTIONS,
  SET_INDENTATION,
  SET_MAX_LINE_LENGTH,
  SET_SHOULD_PLACE_DOTS_AFTER_LINE_BREAKS,
} = require('./actions.js');

const handleSetQueryInput = (state, queryInput) => ({ ...state, queryInput });

const handleFormatQuery = (state) => ({
  ...state,
  queryOutput: formatQuery(state.queryInput, {
    indentation: state.indentation,
    maxLineLength: state.maxLineLength,
    shouldPlaceDotsAfterLineBreaks: state.shouldPlaceDotsAfterLineBreaks,
  }),
});

const handleToggleShouldShowAdvancedOptions = (state) => ({
  ...state,
  shouldShowAdvancedOptions: !state.shouldShowAdvancedOptions,
});

const handleSetIndentation = (state, unparsedIndentation) => {
  const indentation = parseInt(unparsedIndentation);
  if (isNaN(indentation)) return { ...state };
  if (indentation < 0) return { ...state, indentation: 0 };
  const { maxLineLength } = state;
  if (indentation > maxLineLength) {
    return { ...state, indentation: maxLineLength };
  }
  return { ...state, indentation };
};

const handleSetMaxLineLength = (state, unparsedMaxLineLength) => {
  const maxLineLength = parseInt(unparsedMaxLineLength);
  if (isNaN(maxLineLength)) return { ...state };
  const { indentation } = state;
  if (maxLineLength < indentation) {
    return { ...state, maxLineLength: indentation };
  }
  return { ...state, maxLineLength };
};

const handleSetShouldPlaceDotsAfterLineBreaks = (
  state,
  shouldPlaceDotsAfterLineBreaks
) => ({ ...state, shouldPlaceDotsAfterLineBreaks });

const reducers = {
  [SET_QUERY_INPUT]: handleSetQueryInput,
  [FORMAT_QUERY]: handleFormatQuery,
  [TOGGLE_SHOULD_SHOW_ADVANCED_OPTIONS]: handleToggleShouldShowAdvancedOptions,
  [SET_INDENTATION]: handleSetIndentation,
  [SET_MAX_LINE_LENGTH]: handleSetMaxLineLength,
  [SET_SHOULD_PLACE_DOTS_AFTER_LINE_BREAKS]: handleSetShouldPlaceDotsAfterLineBreaks,
};

module.exports = reducers;
