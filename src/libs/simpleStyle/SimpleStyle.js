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

const {
  TextColor,
  InputTextColor,
  HighlightedTextColor,
  HighlightColor,
} = include('src/libs/simpleColorPalette/SimpleColorPalette.js');

// A unit is 20px
// vertical-align: bottom prevents half a pixel from getting added to the height
const getInlineContainerStyle = (widthUnits, heightUnits) => `
  display: inline-block;
  vertical-align: bottom;
  padding: 10px;
  box-sizing: border-box;
  height: ${heightUnits * 20}px;
  width: ${widthUnits * 20}px;
`;

const getInputStyle = () => `
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.05);
  outline: none;
  font-size: 16px;
  padding: 10px;
  border: none;
  box-shadow: inset rgba(0, 0, 0, 0.5) 0 0 10px -5px;
  color: ${InputTextColor};
`;

// Used for links
// inline-block is needed for the element to be able to have a height
const getLinkStyle = (isHovered, isSelected) => `
  text-decoration: none;
  display: inline-block;
  height: 20px;
  line-height: 20px;
  font-size: 15px;
  color: ${isHovered || isSelected ? HighlightedTextColor : TextColor};
  border-bottom: ${isSelected ? `2px solid ${HighlightColor}` : 'none'};
`;

// Used for buttons to make them look like text
const getTextButtonStyle = (isHovered) => `
  height: 20px;
  line-height: 20px;
  font-size: 15px;
  color: ${isHovered ? HighlightedTextColor : TextColor};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  outline: none;
`;

// Used for spans and divs and what not
const getTextStyle = () => `
  height: 20px;
  line-height: 20px;
  font-size: 15px;
  color: ${TextColor};
`;

module.exports = {
  getInlineContainerStyle,
  getInputStyle,
  getLinkStyle,
  getTextButtonStyle,
  getTextStyle,
};
