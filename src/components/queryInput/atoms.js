const { textArea$ } = include('src/libraries/fakeReact/FakeReact.js');

const ExpandableTextArea = value =>
  textArea$(value).onInput(textArea => {
    const previousClientHeight = textArea.clientHeight;
    const { scrollX, scrollY } = window;
    textArea.setStyle({ height: 'auto' });
    textArea.setStyle({ height: `${textArea.scrollHeight}px` });
    const newClientHeight = textArea.clientHeight;
    const scrollChange = newClientHeight - previousClientHeight;
    window.scrollTo(scrollX, scrollY + scrollChange);
  });

module.exports = {
  ExpandableTextArea,
};
