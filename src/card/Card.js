import {createCardTemplate} from './create-template';
import {Component} from "../Component";

export class Card extends Component {
  constructor(data) {
    super(data);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  get template() {
    return createCardTemplate(this._data);
  }

  onClickHandler(evt) {
    evt.preventDefault();
    this._onClickHandler(this.getData());
  }

  bind() {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this.onClickHandler);
  }

  getData() {
    return Object.assign({}, this._data);
  }
}
