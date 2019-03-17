import {createCardTemplate} from './create-template';
import {Component} from "../Component";

export class Card extends Component {
  constructor(data) {
    super(data);
    this.onCommentButtonClick = this.onCommentButtonClick.bind(this);
  }

  get template() {
    return createCardTemplate(this._data);
  }

  onCommentButtonClick(evt) {
    evt.preventDefault();
    this._onClickHandler(this.getData());
  }

  update(data) {
    this.setPrivateProperties(data);
  }

  bind() {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this.onCommentButtonClick);
  }

  getData() {
    return Object.assign({}, this._data);
  }
}
