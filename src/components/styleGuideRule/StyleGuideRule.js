const Title = include('src/components/title/Title.js');
const Paragraph = include('src/components/paragraph/Paragraph.js');
const Code = include('src/components/code/Code.js');
const Spacer = include('src/components/spacer/Spacer.js');
const { html } = include('src/libs/simpleHTML/SimpleHTML.js');

const StyleGuideRule = (getProps) => {
  const getTitle = () => getProps().title;
  const getExplanation = () => getProps().explanation;
  const getExample = () => getProps().example;

  return html('div', {}, [
    Title(() => ({ innerText: getTitle() })),
    Paragraph(() => ({ innerText: getExplanation() })),
    Code(() => ({ innerText: getExample() })),
    Spacer(() => ({})),
  ]);
};

module.exports = StyleGuideRule;
