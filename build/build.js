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

const { readContentFromFile, writeContentToFile } = require('./fileUtils');
const { extractImportPaths } = require('./parseUtils');
const { getOrderedListOfFiles } = require('./sortUtils');

const build = () => {
  let importedFilePaths = {};
  let importQueue = ['src/index.js'];

  let output = `
<!DOCTYPE html>
<html lang="en-US">
<head>
<meta name="google-site-verification" content="8rkkiQkZaBwVUAUBxSY6Nj_EBHqCGPEYnEJmlyXuLnw" />
<script>
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
      path === 'src/index.js'
        ? `
window.addEventListener('load', () => {
${content}
})
`
        : `
modules['${path}'] = (() => {
  const module = { exports: {} };
  ${content}
  return module.exports;
})();
`;
  });

  output += '</script></head><body></body></html>';

  writeContentToFile(output, 'dist/index.html');
};

module.exports = { build };
