const withIndentation = (config, indentation) => ({ ...config, indentation });

const withZeroIndentation = (config) => withIndentation(config, 0);

const withIncreasedIndentation = (config, indentationIncrease) => ({
  ...config,
  indentation: config.indentation + indentationIncrease,
});

module.exports = {
  withIndentation,
  withZeroIndentation,
  withIncreasedIndentation,
};
