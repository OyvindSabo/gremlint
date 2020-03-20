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

module.exports = {
  Observable,
};
