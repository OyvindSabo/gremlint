const test = (testTitle, ...assertions) => {
  console.log('running test');
};
const assertEquals = () => {
  console.log('running assertEquals');
  return true;
};

module.exports = {
  test,
  assertEquals,
};
