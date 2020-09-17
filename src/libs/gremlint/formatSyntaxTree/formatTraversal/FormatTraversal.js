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

const { recreateQueryOnelinerFromSyntaxTree } = include(
  'src/libs/gremlint/recreateQueryOnelinerFromSyntaxTree/RecreateQueryOnelinerFromSyntaxTree.js'
);
const { getStepGroups } = include(
  'src/libs/gremlint/formatSyntaxTree/formatTraversal/getStepGroups/GetStepGroups.js'
);
const { withZeroIndentation } = include(
  'src/libs/gremlint/formatSyntaxTree/utils.js'
);

// Groups steps into step groups and adds an indentation property
const formatTraversal = (formatSyntaxTree) => (config) => (syntaxTree) => {
  const recreatedQuery = recreateQueryOnelinerFromSyntaxTree(
    config.indentation
  )(syntaxTree);
  if (recreatedQuery.length <= config.maxLineLength) {
    return {
      type: 'traversal',
      stepGroups: [
        {
          steps: syntaxTree.steps.map((step, stepIndex) =>
            formatSyntaxTree(
              stepIndex === 0 ? config : withZeroIndentation(config)
            )(step)
          ),
        },
      ],
    };
  }
  return {
    type: 'traversal',
    stepGroups: getStepGroups(formatSyntaxTree, syntaxTree.steps, config),
  };
};

module.exports = { formatTraversal };
