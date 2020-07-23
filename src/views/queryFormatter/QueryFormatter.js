const QueryInput = include('src/components/queryInput/QueryInput.js');
const Code = include('src/components/code/Code.js');
const TextButton = include('src/components/textButton/TextButton.js');
const AdvancedOptions = include(
  'src/views/queryFormatter/advancedOptions/AdvancedOptions.js'
);
const { compose, If } = include('src/libs/simpleHTML/SimpleHTML.js');
const {
  getQueryInput,
  setQueryInput,
  getQueryOutput,
  getShowAdvancedOptions,
  setShowAdvancedOptions,
  getMaxLineLength,
} = include('src/store/Store.js');

const QueryFormatter = () => {
  const element = compose('div', {}, [
    QueryInput(() => ({
      value: getQueryInput(),
      oninput: ({ target }) => setQueryInput(target.value),
    })),
    TextButton(() => ({
      label: getShowAdvancedOptions()
        ? 'Hide advanced options'
        : 'Show advanced options',
      onclick: () => setShowAdvancedOptions(!getShowAdvancedOptions()),
    })),
    If(getShowAdvancedOptions, () => [AdvancedOptions()]),
    If(
      () => getQueryOutput(),
      () => [
        Code(() => ({
          innerText: getQueryOutput(),
          maxLineLength: getMaxLineLength(),
        })),
      ]
    ),
  ]);
  return element;
};

module.exports = QueryFormatter;
