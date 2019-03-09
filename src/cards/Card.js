import {createCardTemplate} from './create-template';
import {createElement} from "../utils";

export class Card {
  constructor(card) {
    this._card = card;
    this._element = null;
  }

  get template() {
    return createCardTemplate(this.getData());
  }

  set onClick(func) {
    this._onClickHandler = func;
  }

  bind() {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._onClickHandler(this._card);
    });
  }

  getData() {
    return Object.assign({}, this._card);
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }
}
