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

const { spaces } = include('src/libs/gremlint/utils.js');

const recreateQueryStringFromFormattedSyntaxTree = (syntaxTree) => {
  if (syntaxTree.type === 'traversal') {
    return syntaxTree.stepGroups
      .map((stepGroup) =>
        stepGroup.steps
          .map(recreateQueryStringFromFormattedSyntaxTree)
          .join('.')
      )
      .join('\n');
  }
  if (syntaxTree.type === 'method') {
    return (
      (syntaxTree.shouldStartWithDot ? '.' : '') +
      [
        recreateQueryStringFromFormattedSyntaxTree(syntaxTree.method) + '(',
        syntaxTree.argumentGroups
          .map((arguments) =>
            arguments.map(recreateQueryStringFromFormattedSyntaxTree).join(', ')
          )
          .join(',\n') +
          ')' +
          (syntaxTree.shouldEndWithDot ? '.' : ''),
      ].join(syntaxTree.argumentsShouldStartOnNewLine ? '\n' : '')
    );
  }
  if (syntaxTree.type === 'string') {
    return spaces(syntaxTree.indentation) + syntaxTree.string;
  }
  if (syntaxTree.type === 'word') {
    return (
      spaces(syntaxTree.indentation) +
      (syntaxTree.shouldStartWithDot ? '.' : '') +
      syntaxTree.word +
      (syntaxTree.shouldEndWithDot ? '.' : '')
    );
  }
};

module.exports = {
  recreateQueryStringFromFormattedSyntaxTree,
};
