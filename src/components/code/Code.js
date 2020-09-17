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

const { html, If } = include('src/libs/simpleHTML/SimpleHTML.js');
const { DisabledTextColor, TextColor } = include(
  'src/libs/simpleColorPalette/SimpleColorPalette.js'
);

const getCodeStyle = () => `
  border-radius: 5px;
  font-family: "Courier New", Courier, monospace;
  background: rgba(0, 0, 0, 0.05);
  outline: none;
  font-size: 15px;
  padding: 10px;
  border: none;
  resize: none;
  box-shadow: inset rgba(0, 0, 0, 0.5) 0 0 10px -5px;
  white-space: pre-wrap;
  overflow: auto;
`;

const Code = (getProps) => {
  const getInnerText = () => getProps().innerText;
  const getMaxLineLength = () => getProps().maxLineLength;
  const element = html('div', { style: 'padding: 10px;' }, [
    html('div', { style: getCodeStyle() + 'position: relative;' }, [
      html(
        'span',
        () => ({
          style: `color: ${TextColor}; line-height: 20px; font-size: 15px;`,
          innerText: getInnerText(),
        }),
        []
      ),
      If(
        () => getMaxLineLength() !== undefined,
        () => [
          html(
            'div',
            () => ({
              style: `top: 0;
                      left: 0;
                      width: calc(10px + ${getMaxLineLength()}ch);
                      border-right: 1px solid ${DisabledTextColor};
                      position: absolute;
                      height: 100%;
                      pointer-events: none;`,
            }),
            []
          ),
        ]
      ),
    ]),
  ]);
  return element;
};

module.exports = Code;
