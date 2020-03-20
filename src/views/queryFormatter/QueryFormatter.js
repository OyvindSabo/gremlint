const QueryFormatter = ({ state }) =>
  div$(
    QueryInput(state.queryInput$).onInput(({ value }) => {
      state.queryInput$.value = value;
      state.queryOutput$.value = formatQuery(value);
    }),
    QueryOutput(state.queryOutput$)
  );

module.exports = {
  QueryFormatter,
};
