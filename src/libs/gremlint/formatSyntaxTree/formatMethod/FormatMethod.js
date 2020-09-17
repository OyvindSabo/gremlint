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

const { pipe } = include('src/libs/simpleFP/SimpleFP.js');
const { recreateQueryOnelinerFromSyntaxTree } = include(
  'src/libs/gremlint/recreateQueryOnelinerFromSyntaxTree/RecreateQueryOnelinerFromSyntaxTree.js'
);
const {
  withIncreasedIndentation,
  withZeroIndentation,
  withZeroDotInfo,
  withNoEndDotInfo,
} = include('src/libs/gremlint/formatSyntaxTree/utils.js');

// Groups arguments into argument groups an adds an indentation property
const formatMethod = (formatSyntaxTree) => (config) => (syntaxTree) => {
  const recreatedQuery = recreateQueryOnelinerFromSyntaxTree(
    config.indentation
  )(syntaxTree);
  if (recreatedQuery.length <= config.maxLineLength) {
    return {
      type: 'method',
      method: formatSyntaxTree(withNoEndDotInfo(config))(syntaxTree.method),
      // The arguments property is here so that the resulted syntax tree can
      // still be understood by recreateQueryOnelinerFromSyntaxTree
      arguments: syntaxTree.arguments,
      argumentGroups: [
        syntaxTree.arguments.map(
          formatSyntaxTree(pipe(withZeroIndentation, withZeroDotInfo)(config))
        ),
      ],
      argumentsShouldStartOnNewLine: false,
      indentation: config.indentation,
      shouldEndWithDot: config.shouldEndWithDot,
    };
  }
  // shouldEndWithDot has to reside on the method object, so the end dot can be
  // placed after the method parentheses. shouldStartWithDot has to be passed on
  // further down so the start dot can be placed after the indentation.
  return {
    type: 'method',
    method: formatSyntaxTree(withNoEndDotInfo(config))(syntaxTree.method),
    argumentGroups: syntaxTree.arguments.map((step) => [
      formatSyntaxTree(
        pipe(withIncreasedIndentation(2), withZeroDotInfo)(config)
      )(step),
    ]),
    argumentsShouldStartOnNewLine: true,
    shouldEndWithDot: config.shouldEndWithDot,
  };
};

module.exports = { formatMethod };
