const pipe = (...fns) => (value) => fns.reduce((value, fn) => fn(value), value);

module.exports = { pipe };
