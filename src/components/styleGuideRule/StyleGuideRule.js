const { compose } = include('src/libs/simpleHTML/SimpleHTML.js');

const StyleGuideRule = (getProps) => {
  const getTitle = () => getProps().title;
  const getExplanation = () => getProps().explanation;
  const getExample = () => getProps().example;

  return compose('div', {}, [
    compose('h3', () => ({ innerText: getTitle() }), []),
    compose('p', () => ({ innerText: getExplanation() }), []),
    compose('pre', () => ({ innerText: getExample() }), []),
  ]);
};

module.exports = StyleGuideRule;
