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
const { White } = include('src/libs/simpleColorPalette/SimpleColorPalette.js');

const LoadingAnimation = (getProps) => {
  let loadingCompletion = 0;
  let coloredImageHasLoaded = false;
  let grayscaleImageHasLoaded = false;
  const getOnLoadingComplete = () => getProps().onLoadingComplete;
  const setColoredImageHasLoaded = () => {
    if (!coloredImageHasLoaded) {
      coloredImageHasLoaded = true;
      element.update();
    }
  };
  const setGrayscaleImageHasLoaded = () => {
    if (!grayscaleImageHasLoaded) {
      grayscaleImageHasLoaded = true;
      element.update();
    }
  };

  const element = html(
    'div',
    () => ({
      style: `position: fixed;
              background: ${White};
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              z-index: 2;
              `,
    }),
    [
      html(
        'div',
        () => ({
          style: `height: 100%; width: 100%; position: absolute; bottom: calc(50vh - 25vmin);`,
        }),
        [
          html(
            'img',
            () => ({
              src:
                'https://gremlint.com/wp-content/uploads/2020/07/Lowpoly-Gremlin-with-Text-Grayscale-1080x1080-1.png',
              style: `opacity: ${
                grayscaleImageHasLoaded && loadingCompletion !== 100 ? 1 : 0
              };
                      transition: 0.25s;
                      height: 50vmin;
                      width: 50vmin;
                      display: block;
                      margin: auto;
                      position: absolute;
                      bottom: 0;
                      left: 50%;
                      transform:
                      translate(-50%, 0);`,
              onload: setGrayscaleImageHasLoaded,
            }),
            []
          ),
        ]
      ),
      html(
        'div',
        () => ({
          style: `overflow: hidden;
          height: ${loadingCompletion / 2}vmin;
          width: 100%; position: absolute;
          bottom: calc(50vh - 25vmin);`,
        }),
        [
          html(
            'img',
            () => ({
              src:
                'https://gremlint.com/wp-content/uploads/2020/07/Lowpoly-Gremlin-with-Text-1080x1080-1.png',
              style: `opacity: ${loadingCompletion !== 100 ? 1 : 0};
                      transition: 0.25s;
                      height: 50vmin;
                      width: 50vmin;
                      display: block;
                      margin: auto;
                      position: absolute;
                      bottom: 0;
                      left: 50%;
                      transform: translate(-50%, 0);`,
              onload: setColoredImageHasLoaded,
            }),
            []
          ),
        ]
      ),
    ]
  );
  const load = () => {
    setTimeout(
      () => {
        if (loadingCompletion < 100) {
          if (coloredImageHasLoaded && grayscaleImageHasLoaded) {
            loadingCompletion++;
            element.update();
          }
          load();
        } else {
          element.update();
          setTimeout(getOnLoadingComplete(), 250);
        }
      },
      loadingCompletion === 0 ? 250 : 10
    );
  };
  load();
  return element;
};

module.exports = LoadingAnimation;
