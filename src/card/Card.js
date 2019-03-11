import {createCardTemplate} from './create-template';
import {createElement} from "../utils";

export class Card {
  constructor(data) {
    this._data = data;
    this._element = null;
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  get template() {
    return createCardTemplate(this._data);
  }

  onClickHandler(evt) {
    evt.preventDefault();
    this._onClickHandler(this.getData());
  }

  set onClick(func) {
    this._onClickHandler = func;
  }

  bind() {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this.onClickHandler);
  }

  getData() {
    return Object.assign({}, this._data);
  }

  render() {
    this._element = createElement(this.template).children[0];
    this.bind();
    return this._element;
  }
}
