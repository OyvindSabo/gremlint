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

const ByModulatorWrappingAssertions = [
  // No weapping: All modulators should end up on the same line as the step they
  // are modulating.
  assertEquals(
    'g.V().group().by().by(bothE().count())',
    formatQuery('g.V().group().by().by(bothE().count())', {
      indentation: 0,
      maxLineLength: 40,
      shouldPlaceDotsAfterNewlines: false,
    })
  ),
  // Line wrapping: The modulators fit on the line of the step they are
  // modulating, so they are not wrapped.
  assertEquals(
    `g.V().
  group().by().by(bothE().count())`,
    formatQuery('g.V().group().by().by(bothE().count())', {
      indentation: 0,
      maxLineLength: 35,
      shouldPlaceDotsAfterNewlines: false,
    })
  ),
  // Line wrapping: The modulators don't fit on the line of the step they are
  // modulating, so they are all wrapped and indented with two spaces relative
  // to the step they are modulating.
  assertEquals(
    `g.V().
  group().
    by().
    by(bothE().count())`,
    formatQuery('g.V().group().by().by(bothE().count())', {
      indentation: 0,
      maxLineLength: 30,
      shouldPlaceDotsAfterNewlines: false,
    })
  ),

  // The next examples test queries which have regular steps following the
  // modulator.

  // Line wrapping: The modulators fit on the line of the step they are
  // modulating, so they are not wrapped.
  assertEquals(
    `g.V().
  hasLabel('person').
  group().by(values('name', 'age').fold()).
  unfold().
  filter(
    select(values).count(local).is(gt(1)))`,
    formatQuery(
      "g.V().hasLabel('person').group().by(values('name', 'age').fold()).unfold().filter(select(values).count(local).is(gt(1)))",
      { indentation: 0, maxLineLength: 45, shouldPlaceDotsAfterNewlines: false }
    )
  ),
  // Line wrapping: The modulators don't fit on the line of the step they are
  // modulating, so they are all wrapped and indented with two spaces relative
  // to the step they are modulating.
  assertEquals(
    `g.V().
  hasLabel('person').
  group().
    by(values('name', 'age').fold()).
  unfold().
  filter(
    select(values).
    count(local).
    is(gt(1)))`,
    formatQuery(
      "g.V().hasLabel('person').group().by(values('name', 'age').fold()).unfold().filter(select(values).count(local).is(gt(1)))",
      { indentation: 0, maxLineLength: 40, shouldPlaceDotsAfterNewlines: false }
    )
  ),
];

module.exports = ByModulatorWrappingAssertions;
