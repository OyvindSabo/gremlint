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

const Title = include('src/components/title/Title.js');
const Paragraph = include('src/components/paragraph/Paragraph.js');
const Code = include('src/components/code/Code.js');
const Spacer = include('src/components/spacer/Spacer.js');
const { html } = include('src/libs/simpleHTML/SimpleHTML.js');

const StyleGuideRule = (getProps) => {
  const getTitle = () => getProps().title;
  const getExplanation = () => getProps().explanation;
  const getExample = () => getProps().example;

  return html('div', {}, [
    Title(() => ({ innerText: getTitle() })),
    Paragraph(() => ({ innerText: getExplanation() })),
    Code(() => ({ innerText: getExample() })),
    Spacer(() => ({})),
  ]);
};

module.exports = StyleGuideRule;
