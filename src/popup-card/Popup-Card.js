import {createPopupTemplate} from './create-popup-template';
import {createUserRatingTemplate} from "./create-user-rating-template";
import {createCommentItemTemplate} from "./create-comment-Item-template";
import {createElement} from "../utils";
import {Component} from "../Component";
import {EmojiOfComment} from "../enums";

export class Popup extends Component {
  constructor(data) {
    super(data);
    this._closeBtn = null;
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
    this._onScoreChange = this._onScoreChange.bind(this);
  }

  _onCloseButtonClick(evt) {
    evt.preventDefault();
    const newData = this._getFormFields();
    this.unbind();
    this._onSubmit(newData);
    this.close();
  }

  set onSubmit(func) {
    this._onSubmit = func;
  }

  _processForm(formData) {
    const entry = {
      comments: [...this._data.comments],
      watchlist: false,
      watched: false,
      favorite: false,
      newComment: {
        emoji: ``,
        text: ``,
        author: `Roy Roy`,
        day: Date.now()
      },
      rate: parseInt(this._data.rate, 10) || 0
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
        target.rate = parseInt(value, 10);
      },
      'comment': (value) => {
        target.newComment.text = value;
      },
      'watchlist': (value) => {
        target.watchlist = (value === `on`);
      },
      'watched': (value) => {
        target.watched = (value === `on`);
      },
      'favorite': (value) => {
        target.favorite = (value === `on`);
      },
      'comment-emoji': (value) => {
        target.newComment.emoji = EmojiOfComment[value];
      }
    };
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
      const textField = this._element.querySelector(`.film-details__comment-input`);
      const emoji = this._element.querySelector(`.film-details__emoji-item:checked`);
      if (textField.value || emoji) {
        this._updateHandler();
        textField.value = ``;
        emoji.checked = false;
      }
    }
  }

  _updateHandler() {
    const {comments, rate} = this._data;
    const newData = this._getFormFields();
    this.update(newData);
    if (comments.length < this._data.comments.length) {
      this._rerenderCommentField();
    }
    if (rate !== this._data.rate) {
      this._rerenderRateField();
    }
  }

  _rerenderCommentField() {
    if (!this._commentContainer) {
      this._commentContainer = this._element.querySelector(`.film-details__comments-list`);
    }
    if (!this._countField) {
      this._countField = this._element.querySelector(`.film-details__comments-count`);
    }
    this._countField.innerText = this._data.comments.length;
    this._commentContainer.appendChild(createElement(createCommentItemTemplate(this._data.comments[this._data.comments.length - 1])));
  }

  _rerenderRateField() {
    if (!this._ratingContainer) {
      this._ratingContainer = this._element.querySelector(`.film-details__rating`);
    }
    this._ratingContainer.replaceChild(createElement(createUserRatingTemplate(this._data.rate)), this._ratingContainer.lastElementChild);
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
