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

const NonMethodIndentationAssertions = [
  // Check that non-methods which are neither the first nor the last step in a
  // traversal, and are at the start of a line are indented correctly.
  assertEquals(
    `g.V().
  stepWhichIsNotAMethod.stepWhichIsAMethod()`,
    formatQuery('g.V().stepWhichIsNotAMethod.stepWhichIsAMethod()', {
      indentation: 0,
      maxLineLength: 45,
      shouldPlaceDotsAfterNewlines: false,
    })
  ),
  // Check that non-methods which are the last step in a traversal and are at
  // the start of a line are indented correctly.
  assertEquals(
    `g.V().
  stepWhichIsNotAMethod`,
    formatQuery('g.V().stepWhichIsNotAMethod', {
      indentation: 0,
      maxLineLength: 25,
      shouldPlaceDotsAfterNewlines: false,
    })
  ),
];

module.exports = NonMethodIndentationAssertions;
