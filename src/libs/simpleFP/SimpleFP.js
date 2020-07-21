const last = (array) => array.slice(-1)[0];

const pipe = (...fns) => (value) => fns.reduce((value, fn) => fn(value), value);

module.exports = { last, pipe };
