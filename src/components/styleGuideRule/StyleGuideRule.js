const Title = include('src/components/title/Title.js');
const Paragraph = include('src/components/paragraph/Paragraph.js');
const Code = include('src/components/code/Code.js');
const { compose } = include('src/libs/simpleHTML/SimpleHTML.js');

const StyleGuideRule = (getProps) => {
  const getTitle = () => getProps().title;
  const getExplanation = () => getProps().explanation;
  const getExample = () => getProps().example;

  return compose('div', { style: 'padding: 10px;' }, [
    Title(() => ({ innerText: getTitle() })),
    Paragraph(() => ({ innerText: getExplanation() })),
    Code(() => ({ innerText: getExample() })),
  ]);
};

module.exports = StyleGuideRule;
