import {createPopupTemplate} from './create-popup-template';
import {Component} from "../Component";
import {EmojiOfComment} from "../enums";

export class Popup extends Component {
  constructor(data) {
    super(data);
    this._closeBtn = null;
    this._state = {
      isChanged: false
    };
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
    this._onScoreChange = this._onScoreChange.bind(this);
  }

  _onCloseButtonClick(evt) {
    evt.preventDefault();
    this.unbind();
    if (this._state.isChanged) {
      this._onSubmit(this._data);
    }
    this.close();
  }

  set onSubmit(func) {
    this._onSubmit = func;
  }

  _processForm(formData) {
    const entry = {
      comments: this._data.comments,
      categories: {
        watchlist: false,
        watched: false,
        favorite: false
      },
      newComment: {
        emoji: ``,
        text: ``,
        author: `Roy Roy`,
        day: 0
      }
    };
    const cardEditMapper = Popup.createMapper(entry);
    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (cardEditMapper[property] && value) {
        cardEditMapper[property](value);
      }
    }
    if (entry.newComment.text || entry.newComment.emoji) {
      entry.comments.push(entry.newComment);
    }
    delete entry.newComment;
    return entry;
  }

  static createMapper(target) {
    return {
      'score': (value) => {
        target.rate = value;
      },
      'comment': (value) => {
        target.newComment.text = value;
      },
      'watchlist': (value) => {
        target.categories.watchlist = (value === `on`);
      },
      'watched': (value) => {
        target.categories.watched = (value === `on`);
      },
      'favorite': (value) => {
        target.categories.favorite = (value === `on`);
      },
      'comment-emoji': (value) => {
        target.newComment.emoji = EmojiOfComment[value];
      }
    };
  }

  _setAsChanged() {
    this._state.isChanged = true;
  }

  get comments() {
    return this._data.comments;
  }

  _getFormFields() {
    const formData = new FormData(this._element.querySelector(`.film-details__inner`));
    return this._processForm(formData);
  }

  bind() {
    this._closeBtn = this._element.querySelector(`.film-details__close-btn`);
    this._closeBtn.addEventListener(`click`, this._onCloseButtonClick);
    document.addEventListener(`keydown`, this._onDocumentKeyDown);
    this._scoreElement = this._element.querySelector(`.film-details__user-rating-score`);
    this._scoreElement.addEventListener(`change`, this._onScoreChange);
  }

  _onScoreChange(evt) {
    const inputScore = evt.target.closest(`.film-details__user-rating-input`);
    if (inputScore) {
      this._updateHandler();
    }
  }

  _onDocumentKeyDown(evt) {
    if (evt.which === 13 && evt.ctrlKey) {
      const text = this._element.querySelector(`.film-details__comment-input`).value;
      const emoji = this._element.querySelector(`.film-details__emoji-item:checked`);
      if (text || emoji) {
        this._updateHandler();
      }
    }
  }

  _updateHandler() {
    const newData = this._getFormFields();
    this.update(newData);
    this._setAsChanged();
    this.refresh();
  }

  close() {
    if (this._element) {
      this._element.remove();
    }
  }

  unbind() {
    this._closeBtn.removeEventListener(`click`, this._onCloseButtonClick);
    this._closeBtn = null;
    document.removeEventListener(`keydown`, this._onDocumentKeyDown);
    this._scoreElement.removeEventListener(`change`, this._onScoreChange);
    this._scoreElement = null;
  }

  get template() {
    return createPopupTemplate(this._data);
  }
}
