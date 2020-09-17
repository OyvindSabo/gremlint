const Title = require('../title/Title.js');
const Paragraph = require('../paragraph/Paragraph.js');
const Code = require('../code/Code.js');
const Spacer = require('../spacer/Spacer.js');
const { html } = require('../../libs/simpleHTML/SimpleHTML.js');

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
