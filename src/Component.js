import {createElement} from "./utils";

export class Component {
  constructor(data) {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }
    this._data = data;
    this._element = null;
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  setPrivateProperties(data) {
    Object.keys(data).forEach((key) => {
      if (key === `comment`) {
        this._data.comments.push(data[key]);
      } else {
        this._data[`${key}`] = data[key];
      }
    });
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

