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

const MaxLineLengthAssertions = [
  // When the maximum line length is equal to the length of the query, no line
  // wrapping should occur
  assertEquals(
    "g.V().hasLabel('person').where(outE('created').count().is(P.gte(2))).count()",
    formatQuery(
      "g.V().hasLabel('person').where(outE('created').count().is(P.gte(2))).count()",
      { indentation: 0, maxLineLength: 76, shouldPlaceDotsAfterNewlines: false }
    )
  ),

  // A query of length 77 should be wrapped when the maximum line length is
  // set to 76
  assertEquals(
    `g.V().
  hasLabel('person').
  where(outE('created').count().is(P.gte(2))).
  count()`,
    formatQuery(
      "g.V().hasLabel('person').where(outE('created').count().is(P.gte(2))).count()",
      { indentation: 0, maxLineLength: 75, shouldPlaceDotsAfterNewlines: false }
    )
  ),

  // When wrapping occurs, the parentheses, punctuations or commas after the
  // wrapped tokens should be included when considering whether to further
  // wrap the query. This doesn't currently work, as the following test shows
  assertEquals(
    `g.V().
  hasLabel('person').
  where(
    outE('created').count().is(P.gte(2))).
  count()`,
    formatQuery(
      "g.V().hasLabel('person').where(outE('created').count().is(P.gte(2))).count()",
      { indentation: 0, maxLineLength: 45, shouldPlaceDotsAfterNewlines: false }
    )
  ),
];

module.exports = MaxLineLengthAssertions;
