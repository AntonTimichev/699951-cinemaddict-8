import {createPopupTemplate} from './create-popup-template';
import {Component} from "../Component";

export class Popup extends Component {
  constructor(data) {
    super(data);
    this._closeBtn = null;
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(evt) {
    evt.preventDefault();
    this.unbind();
    this._onClickHandler(this._element);
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
}
