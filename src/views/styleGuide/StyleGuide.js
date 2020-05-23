const StyleGuideRule = include(
  'src/components/styleGuideRule/StyleGuideRule.js'
);
const { compose, Each, If } = include('src/libs/simpleHTML/SimpleHTML.js');
const { rules } = include('src/views/styleGuide/rules/Rules.js');

const StyleGuide = () =>
  compose('div', {}, [
    Each(
      () => rules,
      (getCurrentValue) => [
        StyleGuideRule(() => ({
          title: getCurrentValue().title,
          explanation: getCurrentValue().explanation,
          example: getCurrentValue().example,
        })),
      ]
    ),
  ]);

module.exports = StyleGuide;
