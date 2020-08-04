const ByModulatorIndentationAssertions = include(
  'test/tests/modulatorIndentationAssertions/byModulatorIndentationAssertions/ByModulatorIndentationAssertions.js'
);
const OptionModulatorIndentationAssertions = include(
  'test/tests/modulatorIndentationAssertions/optionModulatorIndentationAssertions/OptionModulatorIndentationAssertions.js'
);
const AsModulatorIndentationAssertions = include(
  'test/tests/modulatorIndentationAssertions/asModulatorIndentationAssertions/AsModulatorIndentationAssertions.js'
);
const As_ModulatorIndentationAssertions = include(
  'test/tests/modulatorIndentationAssertions/as_ModulatorIndentationAssertions/As_ModulatorIndentationAssertions.js'
);
const FromModulatorIndentationAssertions = include(
  'test/tests/modulatorIndentationAssertions/fromModulatorIndentationAssertions/FromModulatorIndentationAssertions.js'
);
const From_ModulatorIndentationAssertions = include(
  'test/tests/modulatorIndentationAssertions/from_ModulatorIndentationAssertions/From_ModulatorIndentationAssertions.js'
);
const ToModulatorIndentationAssertions = include(
  'test/tests/modulatorIndentationAssertions/toModulatorIndentationAssertions/ToModulatorIndentationAssertions.js'
);
const ReadModulatorIndentationAssertions = include(
  'test/tests/modulatorIndentationAssertions/readModulatorIndentationAssertions/ReadModulatorIndentationAssertions.js'
);
const With_ModulatorIndentationAssertions = include(
  'test/tests/modulatorIndentationAssertions/with_ModulatorIndentationAssertions/With_ModulatorIndentationAssertions.js'
);
const WriteModulatorIndentationAssertions = include(
  'test/tests/modulatorIndentationAssertions/writeModulatorIndentationAssertions/WriteModulatorIndentationAssertions.js'
);

const ModulatorIndentationAssertions = [
  ...ByModulatorIndentationAssertions,
  ...OptionModulatorIndentationAssertions,
  ...AsModulatorIndentationAssertions,
  ...As_ModulatorIndentationAssertions,
  ...FromModulatorIndentationAssertions,
  ...From_ModulatorIndentationAssertions,
  ...ToModulatorIndentationAssertions,
  ...ReadModulatorIndentationAssertions,
  ...With_ModulatorIndentationAssertions,
  ...WriteModulatorIndentationAssertions,
];

module.exports = ModulatorIndentationAssertions;
