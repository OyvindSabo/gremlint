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

const { BorderColor, HighlightedTextColor, TextColor, White } = include(
  'src/libs/simpleColorPalette/SimpleColorPalette.js'
);

const getToggleContainerStyle = (width, height) => `
  display: inline-block;
  height: ${height};
  width: ${width};
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.05);
  box-shadow: inset rgba(0, 0, 0, 0.5) 0 0 10px -5px;
  position: relative;
`;

const getOptionStyle = (width, height) => `
  cursor: pointer;
  display: inline-block;
  height: ${height};
  width: calc(${width} / 2);
  box-sizing: border-box;
  padding: 10px;
  line-height: 20px;
  font-size: 16px;
  color: ${TextColor};
  text-align: center;
`;

const getSelectedOptionStyle = (checked) => `
  background: ${White};
  cursor: pointer;
  display: inline-block;
  position: absolute;
  top: 0;
  left: ${checked ? '160px' : '0'};
  height: 40px;
  width: 160px;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 10px;
  line-height: 20px;
  font-size: 16px;
  color: ${HighlightedTextColor};
  text-align: center;
  border: 1px solid ${BorderColor};
  transition: 0.5s;
`;

module.exports = {
  getToggleContainerStyle,
  getOptionStyle,
  getSelectedOptionStyle,
};
