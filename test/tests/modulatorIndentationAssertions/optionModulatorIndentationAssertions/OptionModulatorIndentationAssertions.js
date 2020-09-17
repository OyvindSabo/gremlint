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

const { assertEquals } = include('test/test.js');
const { formatQuery } = include('src/libs/gremlint/Gremlint.js');

const OptionModulatorIndentationAssertions = [
  // If modulators have to be wrapped, they should be indented with two
  // additional spaces, but consecutive steps should not be indented with two
  // additional spaces.
  // Check that option-steps are indented as modulators.
  assertEquals(
    `g.V().
  hasLabel('person').
  choose(values('name')).
    option('marko', values('age')).
    option('josh', values('name')).
    option('vadas', elementMap()).
    option('peter', label())`,
    formatQuery(
      "g.V().hasLabel('person').choose(values('name')).option('marko', values('age')).option('josh', values('name')).option('vadas', elementMap()).option('peter', label())",
      { indentation: 0, maxLineLength: 80, shouldPlaceDotsAfterNewlines: false }
    )
  ),
];

module.exports = OptionModulatorIndentationAssertions;
