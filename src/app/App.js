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

const Navigator = include('src/components/navigator/Navigator.js');
const StyleGuide = include('src/views/styleGuide/StyleGuide.js');
const QueryFormatter = include('src/views/queryFormatter/QueryFormatter.js');
const LoadingAnimation = include(
  'src/components/loadingAnimation/LoadingAnimation.js'
);
const FadeIn = include('src/components/fadeIn/FadeIn.js');
const { html, If } = include('src/libs/simpleHTML/SimpleHTML.js');
const { getCurrentRoute } = include('src/router/Router.js');

const App = () => {
  let loadingComplete = false;
  const onLoadingComplete = () => {
    loadingComplete = true;
    element.update();
  };
  const element = If(
    () => loadingComplete,
    () => [
      FadeIn(() => ({}), [
        html('div', {}, [
          Navigator(() => ({ currentRoute: getCurrentRoute() })),
          html('div', {}, [
            html(
              'div',
              {
                style:
                  'width: min(800px, 100vw); margin-left: calc(50vw - min(400px, 50vw));',
              },
              [
                If(
                  () => getCurrentRoute() === '/',
                  () => [QueryFormatter(() => ({}))]
                ),
                If(
                  () => getCurrentRoute() === '/style-guide',
                  () => [StyleGuide(() => ({}))]
                ),
              ]
            ),
          ]),
        ]),
      ]),
    ],
    () => [LoadingAnimation(() => ({ onLoadingComplete }))]
  );

  return element;
};

module.exports = App;
