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

const EmitModulatorIndentationAssertions = [
  // If modulators have to be wrapped, they should be indented with two
  // additional spaces, but consecutive steps should not be indented with two
  // additional spaces.
  // Check that emit-steps are indented as modulators.
  assertEquals(
    `g.V(1).
  repeat(bothE('created').dedup().otherV()).
    emit().
  path()`,
    formatQuery(
      "g.V(1).repeat(bothE('created').dedup().otherV()).emit().path()",
      { indentation: 0, maxLineLength: 45, shouldPlaceDotsAfterNewlines: false }
    )
  ),
  assertEquals(
    `g.V().
  repeat(both()).
    times(1000000).
    emit().
  range(6, 10)`,
    formatQuery('g.V().repeat(both()).times(1000000).emit().range(6,10)', {
      indentation: 0,
      maxLineLength: 35,
      shouldPlaceDotsAfterNewlines: false,
    })
  ),
  assertEquals(
    `g.V(1).
  repeat(out()).
    times(2).
    emit().
  path().by('name')`,
    formatQuery("g.V(1).repeat(out()).times(2).emit().path().by('name')", {
      indentation: 0,
      maxLineLength: 30,
      shouldPlaceDotsAfterNewlines: false,
    })
  ),

  assertEquals(
    `g.withSack(1).
  V(1).
  repeat(sack(sum).by(constant(1))).
    times(10).
    emit().
  sack().
  math('sin _')`,
    formatQuery(
      "g.withSack(1).V(1).repeat(sack(sum).by(constant(1))).times(10).emit().sack().math('sin _')",
      { indentation: 0, maxLineLength: 40, shouldPlaceDotsAfterNewlines: false }
    )
  ),
];

module.exports = EmitModulatorIndentationAssertions;
