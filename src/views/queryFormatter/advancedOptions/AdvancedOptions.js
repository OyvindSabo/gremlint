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

const Toggle = include('src/components/toggle/Toggle.js');
const { html } = include('src/libs/simpleHTML/SimpleHTML.js');
const {
  getIndentation,
  setIndentation,
  getMaxLineLength,
  setMaxLineLength,
  getShouldPlaceDotsAfterLineBreaks,
  setShouldPlaceDotsAfterLineBreaks,
} = include('src/store/Store.js');

const { getInlineContainerStyle, getInputStyle, getTextStyle } = include(
  'src/libs/simpleStyle/SimpleStyle.js'
);

const AdvancedOptions = () => {
  const element = html('div', {}, [
    html('div', { style: 'padding: 10px' }, [
      html('div', { innerText: 'Indentation', style: getTextStyle() }, []),
      html(
        'input',
        () => ({
          style: getInputStyle() + getInlineContainerStyle(16, 2),
          type: 'number',
          min: 0,
          max: getMaxLineLength(),
          value: getIndentation(),
          oninput: ({ target }) => setIndentation(target.value),
        }),
        []
      ),
    ]),
    html('div', { style: 'padding: 10px;' }, [
      html('div', { innerText: 'Max line length', style: getTextStyle() }, []),
      html(
        'input',
        () => ({
          style: getInputStyle() + getInlineContainerStyle(16, 2),
          type: 'number',
          min: getIndentation(),
          value: getMaxLineLength(),
          oninput: ({ target }) => setMaxLineLength(target.value),
        }),
        []
      ),
    ]),
    html('div', { style: 'padding: 10px;' }, [
      html('div', { innerText: 'Dot placement', style: getTextStyle() }, []),
      Toggle(() => ({
        height: '40px',
        width: '320px',
        checked: getShouldPlaceDotsAfterLineBreaks(),
        labels: {
          checked: 'After line break',
          unchecked: 'Before line break',
        },
        onchange: (checked) => setShouldPlaceDotsAfterLineBreaks(checked),
      })),
    ]),
  ]);
  return element;
};

module.exports = AdvancedOptions;
