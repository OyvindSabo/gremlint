const { html } = include('src/libs/simpleHTML/SimpleHTML.js');
const {
  getToggleContainerStyle,
  getOptionStyle,
  getSelectedOptionStyle,
} = include('src/components/toggle/styles.js');

const Toggle = (getProps) => {
  const getWidth = () => getProps().width || '320px';
  const getHeight = () => getProps().height || '40px;';
  const getIsChecked = () => getProps().checked || false;
  const getLabels = () =>
    getProps().labels || { checked: 'Checked', unchecked: 'Unchecked' };
  const getOnChange = () => getProps().onchange;

  const element = html(
    'span',
    () => ({ style: getToggleContainerStyle(getWidth(), getHeight()) }),
    [
      html(
        'span',
        () => ({
          style: getOptionStyle(getWidth(), getHeight()),
          innerText: getLabels().unchecked,
          onclick: () => getOnChange()(false),
        }),
        []
      ),
      html(
        'span',
        () => ({
          style: getOptionStyle(getWidth(), getHeight()),
          innerText: getLabels().checked,
          onclick: () => getOnChange()(true),
        }),
        []
      ),
      html(
        'span',
        () => ({
          style: getSelectedOptionStyle(getIsChecked()),
          innerText: getIsChecked()
            ? getLabels().checked
            : getLabels().unchecked,
        }),
        []
      ),
    ]
  );
  return element;
};

module.exports = Toggle;
