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

/**
 * @param {{ content: string; dependencies: string[] }} importedFilePaths
 */
const getOrderedListOfFiles = (importedFilePaths) => {
  const orderedListOfFiles = [];
  const handledPaths = [];
  let remainingFiles = Object.entries(importedFilePaths).map(
    ([path, { content, dependencies }]) => ({
      path,
      content,
      dependencies,
    })
  );
  while (remainingFiles.length) {
    const firstFileWithoutDependencies = remainingFiles.find(
      ({ dependencies }, index) => !dependencies.length
    );
    orderedListOfFiles.push({
      path: firstFileWithoutDependencies.path,
      content: firstFileWithoutDependencies.content,
    });
    handledPaths.push(firstFileWithoutDependencies.path);
    remainingFiles = remainingFiles.filter(
      ({ path }) => path !== firstFileWithoutDependencies.path
    );
    remainingFiles.forEach(({ path, dependencies }, index) => {
      remainingFiles[index].dependencies = dependencies.filter(
        (dependency) => dependency !== firstFileWithoutDependencies.path
      );
    });
  }
  return orderedListOfFiles;
};

module.exports = {
  getOrderedListOfFiles,
};
