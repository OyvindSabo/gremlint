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

const { runTests, test, assertEquals } = include('test/test.js');
const { formatQuery } = include('src/libs/gremlint/Gremlint.js');
const MaxLineLengthAssertions = include(
  'test/tests/maxLineLengthAssertions/MaxLineLengthAssertions.js'
);
const ModulatorIndentationAssertions = include(
  'test/tests/modulatorIndentationAssertions/ModulatorIndentationAssertions.js'
);
const ModulatorWrappingAssertions = include(
  'test/tests/modulatorWrappingAssertions/ModulatorWrappingAssertions.js'
);
const DotsAfterNewlinesAssertions = include(
  'test/tests/dotsAfterNewlinesAssertions/DotsAfterNewlinesAssertions.js'
);
const NonMethodIndentationAssertions = include(
  'test/tests/nonMethodIndentationAssertions/NonMethodIndentationAssertions.js'
);

runTests(
  test(
    'No line in the query should exceed the maximum line length',
    ...MaxLineLengthAssertions
  ),

  test(
    'Wrapped modulators should be indented with two spaces',
    ...ModulatorIndentationAssertions
  ),

  test(
    "Modulators should not be line-wrapped if they can fit on the line of the step they're modulating",
    ...ModulatorWrappingAssertions
  ),

  test(
    'If dots are configured to be placed after newlines, make sure they are correctly placed, and not missing, nor duplicated',
    ...DotsAfterNewlinesAssertions
  ),

  test(
    'Non-methods in a traversal should be indented correctly, even if this might never occur in a valid query',
    ...NonMethodIndentationAssertions
  ),

  test(
    'Add linebreak after punctuation, not before',
    assertEquals(
      `g.V().
  has('name', 'marko').
  out('knows').
  has('age', gt(29)).
  values('name')`,
      formatQuery(
        "g.V().has('name', 'marko').out('knows').has('age', gt(29)).values('name')",
        { indentation: 0, maxLineLength: 70 }
      )
    ),
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
        { indentation: 0, maxLineLength: 40 }
      )
    )
  )
);
