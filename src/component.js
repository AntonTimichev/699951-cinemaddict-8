import {createElement} from "./utils";

export default class Component {
  constructor(data) {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }
    this._data = data;
    this._element = null;
  }

  set onClick(func) {
    this._onClickHandler = func;
  }

  get _template() {
    throw new Error(`You have to define template.`);
  }

  render() {
    this._element = createElement(this._template).children[0];
    this._bind();
    return this._element;
  }

  update(data) {
    this._data = Object.assign({}, this._data, data);
  }

  _bind() {}
}

