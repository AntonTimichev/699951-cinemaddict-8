import {createPopupTemplate} from './create-popup-template';
import {createElement} from "../utils";

export class Popup {
  constructor(data) {
    this._data = data;
    this._element = null;
  }

  set onClick(func) {
    this._onClickHandler = func;
  }

  bind() {
    this._element.querySelector(`.film-details__close-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._onClickHandler();
    });
  }

  get template() {
    return createPopupTemplate(this._data);
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }
}
