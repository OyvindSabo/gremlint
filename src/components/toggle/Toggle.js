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

const { html } = include('src/libs/simpleHTML/SimpleHTML.js');
const {
  getToggleContainerStyle,
  getOptionStyle,
  getSelectedOptionStyle,
} = include('src/components/toggle/styles.js');

const Toggle = (getProps) => {
  const getWidth = () => getProps().width || '320px';
  const getHeight = () => getProps().height || '40px;';
  const getIsChecked = () => getProps().checked || false;
  const getLabels = () =>
    getProps().labels || { checked: 'Checked', unchecked: 'Unchecked' };
  const getOnChange = () => getProps().onchange;

  const element = html(
    'span',
    () => ({ style: getToggleContainerStyle(getWidth(), getHeight()) }),
    [
      html(
        'span',
        () => ({
          style: getOptionStyle(getWidth(), getHeight()),
          innerText: getLabels().unchecked,
          onclick: () => getOnChange()(false),
        }),
        []
      ),
      html(
        'span',
        () => ({
          style: getOptionStyle(getWidth(), getHeight()),
          innerText: getLabels().checked,
          onclick: () => getOnChange()(true),
        }),
        []
      ),
      html(
        'span',
        () => ({
          style: getSelectedOptionStyle(getIsChecked()),
          innerText: getIsChecked()
            ? getLabels().checked
            : getLabels().unchecked,
        }),
        []
      ),
    ]
  );
  return element;
};

module.exports = Toggle;
