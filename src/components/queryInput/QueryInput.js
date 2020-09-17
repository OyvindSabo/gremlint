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
const { InputTextColor } = include(
  'src/libs/simpleColorPalette/SimpleColorPalette.js'
);

const getQueryInputStyle = () => `
  height: calc(100vh / 4);
  border-radius: 5px;
  font-family: "Courier New", Courier, monospace;
  background: rgba(0, 0, 0, 0.05);
  outline: none;
  font-size: 16px;
  padding: 10px;
  border: none;
  resize: none;
  width: 100%;
  box-shadow: inset rgba(0, 0, 0, 0.5) 0 0 10px -5px;
  color: ${InputTextColor};
  box-sizing: border-box;
`;

const QueryInput = (getProps) => {
  const getOnInput = () => getProps().oninput;
  const getValue = () => getProps().value;
  return html('div', { style: 'padding: 10px;' }, [
    html(
      'textarea',
      () => ({
        oninput: getOnInput(),
        style: getQueryInputStyle(),
        value: getValue(),
        rows: 20,
      }),
      []
    ),
  ]);
};

module.exports = QueryInput;
