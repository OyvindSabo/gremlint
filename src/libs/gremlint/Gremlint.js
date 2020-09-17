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
const { parseToSyntaxTree } = include(
  'src/libs/gremlint/parseToSyntaxTree/ParseToSyntaxTree.js'
);
const { formatSyntaxTree } = include(
  'src/libs/gremlint/formatSyntaxTree/FormatSyntaxTree.js'
);
const { recreateQueryStringFromFormattedSyntaxTree } = include(
  'src/libs/gremlint/recreateQueryStringFromFormattedSyntaxTree/RecreateQueryStringFromFormattedSyntaxTree.js'
);

const formatQuery = (
  query,
  config = {
    indentation: 0,
    maxLineLength: 80,
    shouldPlaceDotsAfterNewlines: false,
  }
) => {
  return pipe(
    parseToSyntaxTree,
    formatSyntaxTree(config),
    recreateQueryStringFromFormattedSyntaxTree
  )(query);
};

module.exports = {
  formatQuery,
};
