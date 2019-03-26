import {createElement} from "./utils";

export class Component {
  constructor(data) {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }
    this._data = data;
    this._element = null;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  update(data) {
    this._data = Object.assign({}, this._data, data);
  }

  bind() {}

  set onClick(func) {
    this._onClickHandler = func;
  }

  render() {
    this._element = createElement(this.template).children[0];
    this.bind();
    return this._element;
  }
}

