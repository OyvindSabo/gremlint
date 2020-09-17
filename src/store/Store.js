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

const Observable = include('src/libs/observable/Observable.js');
const { formatQuery } = include('src/libs/gremlint/Gremlint.js');

const atom = (initialValue) => {
  const observable$ = new Observable(initialValue);
  const get = () => observable$.value;
  const set = (value) => {
    observable$.value = value;
  };
  const addChangeListener = (callback) =>
    addEventListener(observable$.id, callback);
  return [get, set, addChangeListener];
};

const [getQueryInput, setQueryInput, addQueryInputChangeListener] = atom('');

const [getQueryOutput, setQueryOutput, addQueryOutputChangeListener] = atom('');

const [
  getShowAdvancedOptions,
  setShowAdvancedOptions,
  addShowAdvancedOptionsChangeListener,
] = atom(false);

const [getIndentation, _setIndentation, addIndentationChangeListener] = atom(0);
const setIndentation = (value) => {
  const indentation = parseInt(value);
  if (isNaN(indentation)) return;
  if (indentation < 0) {
    _setIndentation(0);
    return;
  }
  const maxLineLength = getMaxLineLength();
  if (indentation > maxLineLength) {
    _setIndentation(maxLineLength);
    return;
  }
  _setIndentation(indentation);
};

const [
  getMaxLineLength,
  _setMaxLineLength,
  addMaxLineLengthChangeListener,
] = atom(72);
const setMaxLineLength = (value) => {
  const maxLineLength = parseInt(value);
  if (isNaN(maxLineLength)) return;

  const indentation = getIndentation();
  if (maxLineLength < indentation) {
    _setMaxLineLength(indentation);
    return;
  }
  _setMaxLineLength(maxLineLength);
};

const [
  getShouldPlaceDotsAfterLineBreaks,
  setShouldPlaceDotsAfterLineBreaks,
  addShouldPlaceDotsAfterLineBreaksChangeListener,
] = atom(false);

addQueryInputChangeListener(({ detail }) => {
  setQueryOutput(
    formatQuery(detail, {
      indentation: getIndentation(),
      maxLineLength: getMaxLineLength(),
      shouldPlaceDotsAfterNewlines: getShouldPlaceDotsAfterLineBreaks(),
    })
  );
});

addIndentationChangeListener(() => {
  setQueryOutput(
    formatQuery(getQueryInput(), {
      indentation: getIndentation(),
      maxLineLength: getMaxLineLength(),
      shouldPlaceDotsAfterNewlines: getShouldPlaceDotsAfterLineBreaks(),
    })
  );
});

addMaxLineLengthChangeListener(() => {
  setQueryOutput(
    formatQuery(getQueryInput(), {
      indentation: getIndentation(),
      maxLineLength: getMaxLineLength(),
      shouldPlaceDotsAfterNewlines: getShouldPlaceDotsAfterLineBreaks(),
    })
  );
});

addShouldPlaceDotsAfterLineBreaksChangeListener(() => {
  setQueryOutput(
    formatQuery(getQueryInput(), {
      indentation: getIndentation(),
      maxLineLength: getMaxLineLength(),
      shouldPlaceDotsAfterNewlines: getShouldPlaceDotsAfterLineBreaks(),
    })
  );
});

module.exports = {
  getQueryInput,
  setQueryInput,
  addQueryInputChangeListener,

  getQueryOutput,
  setQueryOutput,
  addQueryOutputChangeListener,

  getShowAdvancedOptions,
  setShowAdvancedOptions,
  addShowAdvancedOptionsChangeListener,

  getIndentation,
  setIndentation,
  addIndentationChangeListener,

  getMaxLineLength,
  setMaxLineLength,
  addMaxLineLengthChangeListener,

  getShouldPlaceDotsAfterLineBreaks,
  setShouldPlaceDotsAfterLineBreaks,
  addShouldPlaceDotsAfterLineBreaksChangeListener,
};
