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

const { readContentFromFile } = require('../build/fileUtils');
const { extractImportPaths } = require('../build/parseUtils');
const { getOrderedListOfFiles } = require('../build/sortUtils');

const run = (pathOfFileToRun) => {
  let importedFilePaths = {};
  let importQueue = [pathOfFileToRun];

  let output = `
const modules = {}
const include = path => modules[path];
`;

  while (importQueue.length) {
    const path = importQueue.shift();
    const fileContent = readContentFromFile(path);
    const paths = extractImportPaths(fileContent);
    importedFilePaths[path] = {
      content: fileContent,
      dependencies: paths,
    };
    paths.forEach((path) => {
      if (!importedFilePaths[path]) {
        importQueue.push(path);
      }
    });
  }
  const topologicallyOrderedFiles = getOrderedListOfFiles(importedFilePaths);
  topologicallyOrderedFiles.forEach(({ path, content }) => {
    output +=
      path === pathOfFileToRun
        ? `
${content}
`
        : `
modules['${path}'] = (() => {
  const module = { exports: {} };
  ${content}
  return module.exports;
})();
`;
  });

  return eval(output);
};

module.exports = { run };
