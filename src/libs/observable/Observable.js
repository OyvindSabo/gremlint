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

class Observable {
  constructor(value) {
    // Maybe this can cause an id collision of two observables created almost at the same time
    this._id = `${Math.random()}${+new Date()}`;
    this._value = value;
  }
  emit() {
    window.dispatchEvent(
      new CustomEvent(this._id, {
        detail: this._value,
      })
    );
  }
  get id() {
    return this._id;
  }
  get value() {
    return this._value;
  }
  set value(value) {
    // Maybe this should do a deep compare in case value is an object?
    if (value === this._value) return;
    this._value = value;
    this.emit();
  }
}

module.exports = Observable;
