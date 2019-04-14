import {createPopupTemplate} from './create-popup-template';
import {createUserRatingTemplate} from "./create-user-rating-template";
import {createCommentItemTemplate} from "./create-comment-item-template";
import {createElement} from "../utils";
import {Component} from "../Component";

export class Popup extends Component {
  constructor(data) {
    super(data);
    this._closeBtn = null;
    this._state = {
      isChange: false,
      text: false,
      rate: false
    };
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
    this._onFormPopupChange = this._onFormPopupChange.bind(this);
    this._onCommentInput = this._onCommentInput.bind(this);
    this._onUndoButtonClick = this._onUndoButtonClick.bind(this);
  }

  _onCloseButtonClick(evt) {
    evt.preventDefault();
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
        emotion: ``,
        comment: ``,
        author: `Roy Roy`,
        date: Date.now()
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
    if (entry.newComment.emotion) {
      entry.comments.push(entry.newComment);
    } else if (entry.newComment.comment) {
      entry.newComment.emotion = `neutral-face`;
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
        target.newComment.comment = value;
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
        target.newComment.emotion = value;
      }
    };
  }

  _getFormFields() {
    const formData = new FormData(this._element.querySelector(`.film-details__inner`));
    return this._processForm(formData);
  }

  bind() {
    document.addEventListener(`keydown`, this._onDocumentKeyDown);
    this._closeBtn = this._element.querySelector(`.film-details__close-btn`);
    this._closeBtn.addEventListener(`click`, this._onCloseButtonClick);
    this._form = this._element.querySelector(`.film-details__inner`);
    this._form.addEventListener(`change`, this._onFormPopupChange);
    this._textField = this._element.querySelector(`.film-details__comment-input`);
    this._textField.addEventListener(`input`, this._onCommentInput);
    this._watchedStatus = this._element.querySelector(`.film-details__watched-status`);
    this._undoButton = this._element.querySelector(`.film-details__watched-reset`);
    this._undoButton.addEventListener(`click`, this._onUndoButtonClick);
  }

  _onUndoButtonClick() {
    const comments = [...this._data.comments];
    comments.pop();
    this.update({comments});
    this._state.del = true;
    this._onSubmit(this._data);
  }

  _onFormPopupChange(evt) {
    this._inputScore = evt.target.closest(`.film-details__user-rating-input`);
    if (this._inputScore) {
      if (this._inputLabel) {
        this._inputLabel.classList.remove(`error-input-score`);
      }
      this._inputLabel = this._element.querySelector(`.film-details__user-rating-label[for='rating-${this._inputScore.value}']`);
      this._state.rate = true;
      this.update({rate: this._inputScore.value});
      this._rerenderRateField();
    } else {
      this._emotion = evt.target.closest(`.film-details__emoji-item:checked`);
    }
    this._state.isChange = true;
  }

  _onCommentInput() {
    this._state.isChange = true;
  }

  _onDocumentKeyDown(evt) {
    if (evt.which === 13 && evt.ctrlKey && this._state.isChange) {
      if (this._textField.value || this._emotion) {
        this._textField.classList.remove(`error-comment`);
        this._state.text = true;
      }
      this.update(this._getFormFields());
      this._block();
      this._onSubmit(this._data);
      this._state.isChange = false;
    } else if (evt.which === 27) {
      this.close();
    }
  }

  _clearComment() {
    this._textField.value = ``;
    if (this._emotion) {
      this._emotion.checked = false;
    }
  }

  _block() {
    for (let field of this._form.elements) {
      field.disabled = true;
    }
  }

  _unblock() {
    for (let field of this._form.elements) {
      field.disabled = false;
    }
  }

  processResponse(bool = true) {
    this._unblock();
    if (this._state.text) {
      this._clearComment();
      if (bool) {
        this._rerenderCommentField();
        this._showAddedCommentStatus();
      } else {
        this._textField.classList.add(`error-comment`);
      }
      this._state.text = false;
    }
    if (this._state.rate) {
      if (bool) {
        this._rerenderRateField();
      } else {
        this._inputLabel.classList.add(`error-input-score`);
      }
      this._state.rate = false;
    }
    if (bool && this._state.del) {
      this._rerenderCommentField();
      this._showDeletedCommentStatus();
    }
  }

  _showDeletedCommentStatus() {
    this._watchedStatus.innerHTML = `Comment deleted`;
    this._undoButton.classList.add(`visually-hidden`);
    this._state.del = false;
  }

  _showAddedCommentStatus() {
    this._watchedStatus.innerHTML = `Comment added`;
    this._undoButton.classList.remove(`visually-hidden`);
  }

  showErrorOfForm() {
    this._form.classList.add(`shake`);
    const timerForm = setTimeout(() => {
      this._form.classList.remove(`shake`);
      clearTimeout(timerForm);
    }, 1000);
  }

  _rerenderCommentField() {
    if (!this._commentContainer) {
      this._commentContainer = this._element.querySelector(`.film-details__comments-list`);
    }
    if (!this._countField) {
      this._countField = this._element.querySelector(`.film-details__comments-count`);
    }
    this._countField.innerText = this._data.comments.length;
    if (this._state.del) {
      this._commentContainer.removeChild(this._commentContainer.lastElementChild);
    } else {
      this._commentContainer.appendChild(createElement(createCommentItemTemplate(this._data.comments[this._data.comments.length - 1])));
    }
  }

  _rerenderRateField() {
    if (!this._ratingContainer) {
      this._ratingContainer = this._element.querySelector(`.film-details__rating`);
    }
    this._ratingContainer.replaceChild(createElement(createUserRatingTemplate(this._data.rate)), this._ratingContainer.lastElementChild);
  }

  close() {
    this.unbind();
    if (this._element) {
      this._element.remove();
    }
  }

  unbind() {
    this._closeBtn.removeEventListener(`click`, this._onCloseButtonClick);
    this._closeBtn = null;
    document.removeEventListener(`keydown`, this._onDocumentKeyDown);
    this._form.removeEventListener(`change`, this._onFormPopupChange);
    this._form = null;
    this._textField.removeEventListener(`input`, this._onCommentInput);
    this._textField = null;
    this._emotion = null;
    this._undoButton.removeEventListener(`click`, this._onUndoButtonClick);
    this._undoButton = null;
  }

  get template() {
    return createPopupTemplate(this._data);
  }
}
