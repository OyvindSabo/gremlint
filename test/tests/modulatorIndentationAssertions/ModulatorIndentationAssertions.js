const ByModulatorIndentationAssertions = include(
  'test/tests/modulatorIndentationAssertions/byModulatorIndentationAssertions/ByModulatorIndentationAssertions.js'
);
const OptionModulatorIndentationAssertions = include(
  'test/tests/modulatorIndentationAssertions/optionModulatorIndentationAssertions/OptionModulatorIndentationAssertions.js'
);
const AsModulatorIndentationAssertions = include(
  'test/tests/modulatorIndentationAssertions/asModulatorIndentationAssertions/AsModulatorIndentationAssertions.js'
);
const FromModulatorIndentationAssertions = include(
  'test/tests/modulatorIndentationAssertions/fromModulatorIndentationAssertions/FromModulatorIndentationAssertions.js'
);
const ToModulatorIndentationAssertions = include(
  'test/tests/modulatorIndentationAssertions/toModulatorIndentationAssertions/ToModulatorIndentationAssertions.js'
);
const ReadModulatorIndentationAssertions = include(
  'test/tests/modulatorIndentationAssertions/readModulatorIndentationAssertions/ReadModulatorIndentationAssertions.js'
);
const WriteModulatorIndentationAssertions = include(
  'test/tests/modulatorIndentationAssertions/writeModulatorIndentationAssertions/WriteModulatorIndentationAssertions.js'
);

const ModulatorIndentationAssertions = [
  ...ByModulatorIndentationAssertions,
  ...OptionModulatorIndentationAssertions,
  ...AsModulatorIndentationAssertions,
  ...FromModulatorIndentationAssertions,
  ...ToModulatorIndentationAssertions,
  ...ReadModulatorIndentationAssertions,
  ...WriteModulatorIndentationAssertions,
];

module.exports = ModulatorIndentationAssertions;
