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

const QueryInput = include('src/components/queryInput/QueryInput.js');
const Code = include('src/components/code/Code.js');
const TextButton = include('src/components/textButton/TextButton.js');
const AdvancedOptions = include(
  'src/views/queryFormatter/advancedOptions/AdvancedOptions.js'
);
const { html, If } = include('src/libs/simpleHTML/SimpleHTML.js');
const {
  getQueryInput,
  setQueryInput,
  getQueryOutput,
  getShowAdvancedOptions,
  setShowAdvancedOptions,
  getMaxLineLength,
} = include('src/store/Store.js');

const QueryFormatter = () => {
  const element = html('div', {}, [
    QueryInput(() => ({
      value: getQueryInput(),
      oninput: ({ target }) => setQueryInput(target.value),
    })),
    TextButton(() => ({
      label: getShowAdvancedOptions()
        ? 'Hide advanced options'
        : 'Show advanced options',
      onclick: () => setShowAdvancedOptions(!getShowAdvancedOptions()),
    })),
    html(
      'div',
      () => ({
        style: `max-height: ${
          getShowAdvancedOptions() ? '240px' : '0'
        }; box-shadow: inset white 0 0 10px 0; overflow: hidden; transition: 0.5s;`,
      }),
      [AdvancedOptions()]
    ),
    If(
      () => getQueryOutput(),
      () => [
        Code(() => ({
          innerText: getQueryOutput(),
          maxLineLength: getMaxLineLength(),
        })),
      ]
    ),
  ]);
  return element;
};

module.exports = QueryFormatter;
