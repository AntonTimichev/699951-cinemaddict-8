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
  }

  _onCloseButtonClick(evt) {
    evt.preventDefault();
    const newData = this._getFormField();
    this.unbind();
    if (this._state.isChanged) {
      this._onSubmit(newData);
    }
    this.close();
  }

  set onSubmit(func) {
    this._onSubmit = func;
  }

  _processForm(formData) {
    const entry = {
      comment: {
        emoji: ``,
        text: ``,
        author: `Roy Roy`,
        day: 0
      },
      categories: {
        watchlist: false,
        watched: false,
        favorite: false
      }
    };
    const cardEditMapper = Popup.createMapper(entry);
    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (cardEditMapper[property] && value) {
        this.isChanged();
        cardEditMapper[property](value);
      }
    }
    if (!entry.comment.text && !entry.comment.emoji) {
      delete entry.comment;
    }
    return entry;
  }

  static createMapper(target) {
    return {
      'score': (value) => {
        target.rate = value;
      },
      'comment': (value) => {
        target.comment.text = value;
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
        target.comment.emoji = EmojiOfComment[value];
      }
    };
  }

  isChanged() {
    this._state.isChanged = true;
  }

  get comments() {
    return this._data.comments;
  }

  _getFormField() {
    const formData = new FormData(this._element.querySelector(`.film-details__inner`));
    return this._processForm(formData);
  }

  bind() {
    this._closeBtn = this._element.querySelector(`.film-details__close-btn`);
    this._closeBtn.addEventListener(`click`, this._onCloseButtonClick);
  }

  close() {
    if (this._element) {
      this._element.remove();
    }
  }

  unbind() {
    this._closeBtn.removeEventListener(`click`, this._onCloseButtonClick);
    this._closeBtn = null;
  }

  get template() {
    return createPopupTemplate(this._data);
  }
}
