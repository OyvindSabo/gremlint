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

const trim = (string) => {
  const withoutSpaces = string.trim();
  const withoutStartQuote = [`'`, '"', '`'].includes(withoutSpaces.charAt(0))
    ? withoutSpaces.slice(1)
    : withoutSpaces;
  const withoutEndQuote = [`'`, '"', '`'].includes(
    withoutStartQuote.charAt(withoutStartQuote.length - 1)
  )
    ? withoutStartQuote.slice(0, withoutStartQuote.length - 1)
    : withoutStartQuote;
  return withoutEndQuote;
};

const extractImportPaths = (fileContent) => {
  let remainingFile = fileContent;
  const paths = [];
  while (remainingFile.includes('include(')) {
    const importStartIndex = remainingFile.indexOf('include(') + 9;
    remainingFile = remainingFile.slice(importStartIndex);
    const importEndIndex = remainingFile.indexOf(')') - 1;
    const path = trim(remainingFile.slice(0, importEndIndex));
    remainingFile = remainingFile.slice(importEndIndex);
    paths.push(path);
  }
  return paths;
};

module.exports = {
  extractImportPaths,
};
