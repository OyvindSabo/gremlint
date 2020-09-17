const ByModulatorIndentationAssertions = require('./byModulatorIndentationAssertions/ByModulatorIndentationAssertions.js');
const OptionModulatorIndentationAssertions = require('./optionModulatorIndentationAssertions/OptionModulatorIndentationAssertions.js');
const AsModulatorIndentationAssertions = require('./asModulatorIndentationAssertions/AsModulatorIndentationAssertions.js');
const As_ModulatorIndentationAssertions = require('./as_ModulatorIndentationAssertions/As_ModulatorIndentationAssertions.js');
const EmitModulatorIndentationAssertions = require('./emitModulatorIndentationAssertions/EmitModulatorIndentationAssertions.js');
const FromModulatorIndentationAssertions = require('./fromModulatorIndentationAssertions/FromModulatorIndentationAssertions.js');
const From_ModulatorIndentationAssertions = require('./from_ModulatorIndentationAssertions/From_ModulatorIndentationAssertions.js');
const ToModulatorIndentationAssertions = require('./toModulatorIndentationAssertions/ToModulatorIndentationAssertions.js');
const ReadModulatorIndentationAssertions = require('./readModulatorIndentationAssertions/ReadModulatorIndentationAssertions.js');
const TimesModulatorIndentationAssertions = require('./timesModulatorIndentationAssertions/TimesModulatorIndentationAssertions.js');
const WithModulatorIndentationAssertions = require('./withModulatorIndentationAssertions/WithModulatorIndentationAssertions.js');
const With_ModulatorIndentationAssertions = require('./with_ModulatorIndentationAssertions/With_ModulatorIndentationAssertions.js');
const WriteModulatorIndentationAssertions = require('./writeModulatorIndentationAssertions/WriteModulatorIndentationAssertions.js');

const ModulatorIndentationAssertions = [
  ...ByModulatorIndentationAssertions,
  ...OptionModulatorIndentationAssertions,
  ...AsModulatorIndentationAssertions,
  ...As_ModulatorIndentationAssertions,
  ...EmitModulatorIndentationAssertions,
  ...FromModulatorIndentationAssertions,
  ...From_ModulatorIndentationAssertions,
  ...ToModulatorIndentationAssertions,
  ...ReadModulatorIndentationAssertions,
  ...TimesModulatorIndentationAssertions,
  ...WithModulatorIndentationAssertions,
  ...With_ModulatorIndentationAssertions,
  ...WriteModulatorIndentationAssertions,
];

module.exports = ModulatorIndentationAssertions;
