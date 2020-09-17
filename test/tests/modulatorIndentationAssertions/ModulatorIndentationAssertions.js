/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

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
const EmitModulatorIndentationAssertions = include(
  'test/tests/modulatorIndentationAssertions/emitModulatorIndentationAssertions/EmitModulatorIndentationAssertions.js'
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
const TimesModulatorIndentationAssertions = include(
  'test/tests/modulatorIndentationAssertions/timesModulatorIndentationAssertions/TimesModulatorIndentationAssertions.js'
);
const WithModulatorIndentationAssertions = include(
  'test/tests/modulatorIndentationAssertions/withModulatorIndentationAssertions/WithModulatorIndentationAssertions.js'
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
