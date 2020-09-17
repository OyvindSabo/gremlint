const StyleGuideRule = require('../../components/styleGuideRule/StyleGuideRule.js');
const { html, Each } = require('../../libs/simpleHTML/SimpleHTML.js');
const { rules } = require('../../views/styleGuide/rules/Rules.js');

const StyleGuide = () =>
  html('div', {}, [
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
