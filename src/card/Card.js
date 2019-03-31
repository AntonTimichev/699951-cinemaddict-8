import {createCardTemplate} from './create-card-template';
import {Component} from "../Component";
import {cloneDeep} from 'lodash';
import {createFormControlsOfCard} from "./create-form-controls-of-card";
import {createElement} from "../utils";

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

  rerender() {
    const {comments, watchlist, watched, favorite} = this._data;
    this._commentButton.innerText = `${comments.length} comments`;
    this._element.replaceChild(createElement(createFormControlsOfCard(watchlist, watched, favorite)), this._element.lastElementChild);
  }

  _onControlsButtonClick(evt) {
    evt.preventDefault();
    const pressedButton = evt.target.closest(`.film-card__controls-item`);
    if (pressedButton) {
      pressedButton.classList.toggle(`film-card__controls-item--active`);
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

  get id() {
    return this._data.id;
  }

  getData() {
    return cloneDeep(this._data);
  }
}
