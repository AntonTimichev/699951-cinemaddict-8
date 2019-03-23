import {createCardTemplate} from './create-template';
import {Component} from "../Component";
import * as _ from 'lodash';

export class Card extends Component {
  constructor(data) {
    super(data);
    this._onCommentButtonClick = this._onCommentButtonClick.bind(this);
    this._onControlsButtonClick = this._onControlsButtonClick.bind(this);
  }

  get data() {
    return this._data;
  }

  set onAddToWatchList(func) {
    this._onAddToWatchList = func;
  }

  set onMarkAsWatched(func) {
    this._onMarkAsWatched = func;
  }

  get template() {
    return createCardTemplate(this._data);
  }

  _onCommentButtonClick(evt) {
    evt.preventDefault();
    this._onClickHandler(this.getData());
  }

  _onControlsButtonClick(evt) {
    evt.preventDefault();
    const pressedButton = evt.target.closest(`.film-card__controls-item`);
    if (pressedButton) {
      if (pressedButton.classList.contains(`film-card__controls-item--add-to-watchlist`) && typeof this._onAddToWatchList === `function`) {
        this._onAddToWatchList(this._data);
      } else if (pressedButton.classList.contains(`film-card__controls-item--mark-as-watched`) && typeof this._onMarkAsWatched === `function`) {
        this._onMarkAsWatched(this._data);
      }
    }
  }

  bind() {
    this._commentButton = this._element.querySelector(`.film-card__comments`);
    this._commentButton.addEventListener(`click`, this._onCommentButtonClick);
    this._controls = this._element.querySelector(`.film-card__controls`);
    this._controls.addEventListener(`click`, this._onControlsButtonClick);
  }

  getData() {
    return _.cloneDeep(this._data);
  }
}
