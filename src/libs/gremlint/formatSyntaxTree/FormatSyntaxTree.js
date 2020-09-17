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

const { formatTraversal } = include(
  'src/libs/gremlint/formatSyntaxTree/formatTraversal/FormatTraversal.js'
);
const { formatMethod } = include(
  'src/libs/gremlint/formatSyntaxTree/formatMethod/FormatMethod.js'
);
const { formatString } = include(
  'src/libs/gremlint/formatSyntaxTree/formatString/FormatString.js'
);
const { formatWord } = include(
  'src/libs/gremlint/formatSyntaxTree/formatWord/FormatWord.js'
);

const formatSyntaxTree = (config) => (syntaxTree) => {
  switch (syntaxTree.type) {
    case 'traversal':
      return formatTraversal(formatSyntaxTree)(config)(syntaxTree);
    case 'method':
      return formatMethod(formatSyntaxTree)(config)(syntaxTree);
    case 'string':
      return formatString(config)(syntaxTree);
    case 'word':
      return formatWord(config)(syntaxTree);
  }
};

module.exports = { formatSyntaxTree };
