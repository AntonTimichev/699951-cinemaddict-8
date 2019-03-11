import {createPopupTemplate} from './create-popup-template';
import {createElement} from "../utils";

export class Popup {
  constructor(data) {
    this._data = data;
    this._element = null;
    this._closeBtn = null;
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(evt) {
    evt.preventDefault();
    this.unbind();
    this._onClickHandler(this._element);
  }

  set onClick(func) {
    this._onClickHandler = func;
  }

  bind() {
    this._closeBtn = this._element.querySelector(`.film-details__close-btn`);
    this._closeBtn.addEventListener(`click`, this.onClickHandler);
  }

  unbind() {
    this._closeBtn.removeEventListener(`click`, this.onClickHandler);
    this._closeBtn = null;
  }

  get template() {
    return createPopupTemplate(this._data);
  }

  render() {
    this._element = createElement(this.template).children[0];
    this.bind();
    return this._element;
  }
}
