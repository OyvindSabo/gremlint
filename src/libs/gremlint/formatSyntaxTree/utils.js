const withIndentation = (indentation) => (config) => ({
  ...config,
  indentation,
});

const withZeroIndentation = (config) => withIndentation(0)(config);

const withIncreasedIndentation = (indentationIncrease) => (config) => ({
  ...config,
  indentation: config.indentation + indentationIncrease,
});

const withDotInfo = ({ shouldStartWithDot, shouldEndWithDot }) => (config) => {
  return { ...config, shouldStartWithDot, shouldEndWithDot };
};

const withZeroDotInfo = (config) => ({
  ...config,
  shouldStartWithDot: false,
  shouldEndWithDot: false,
});

const withNoEndDotInfo = (config) => ({
  ...config,
  shouldEndWithDot: false,
});

module.exports = {
  withIndentation,
  withZeroIndentation,
  withIncreasedIndentation,
  withDotInfo,
  withZeroDotInfo,
  withNoEndDotInfo,
};
