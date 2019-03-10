import {createCardTemplate} from './create-template';
import {createElement} from "../utils";

export class Card {
  constructor(data) {
    this._data = data;
    this._element = null;
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  get template() {
    return createCardTemplate(this.getData());
  }

  onClickHandler(evt) {
    evt.preventDefault();
    this._onClickHandler(this.prepareDataForTemplate());
  }

  set onClick(func) {
    this._onClickHandler = func;
  }

  prepareDataForTemplate() {
    const {
      title = ``,
      originTitle = title,
      actors = ``,
      seasons = {},
      ageLimit = ``,
      premiere = ``,
      releaseDate = `12 jun 2019`,
      rate = ``,
      country = `USA`,
      marks = {
        favorites: false,
        seen: false,
        look: true
      },
      rating = ``,
      info = {
        timestamp: ``,
        duration: ``,
        genre: ``
      },
      src = ``,
      description = ``,
      comments = ``,
      controls = true,
      ...settings
    } = this._data;

    return {
      title,
      rating,
      info,
      src,
      originTitle,
      actors,
      seasons,
      ageLimit,
      premiere,
      releaseDate,
      rate,
      country,
      marks,
      description,
      comments,
      controls,
      ...settings
    };
  }

  bind() {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this.onClickHandler);
  }

  getData() {
    return Object.assign({}, this.prepareDataForTemplate());
  }

  render() {
    this._element = createElement(this.template).children[0];
    this.bind();
    return this._element;
  }
}
