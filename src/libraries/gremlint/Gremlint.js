const pipe = value => (...fns) => fns.reduce((value, fn) => fn(value), value);

const formatQuery = (query, config = { maxLineLength: 80 }) => pipe(query)();

module.exports = {
  formatQuery,
};
