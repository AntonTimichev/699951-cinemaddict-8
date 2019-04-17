import {Component} from "../Component";
import {creareTemplateSearchForm} from "./create-template-search-form";

export class Search extends Component {
  constructor() {
    super();
    this._onInput = this._onInput.bind(this);
    this._onSearchButtonClick = this._onSearchButtonClick.bind(this);
    this._onDocumentClick = this._onDocumentClick.bind(this);
  }

  set onSearch(func) {
    this._onSearch = func;
  }

  bind() {
    this._input = this._element.querySelector(`.search__field`);
    this._input.addEventListener(`input`, this._onInput);
    this._searchButton = this._element.querySelector(`button`);
    this._searchButton.addEventListener(`click`, this._onSearchButtonClick);
  }

  _onSearchButtonClick(evt) {
    evt.preventDefault();
    this._onSearch(this._input.value);
    document.addEventListener(`click`, this._onDocumentClick);
  }

  _onDocumentClick(evt) {
    if (!evt.target.closest(`.header__search`) && !evt.target.closest(`.films-list__show-more`)) {
      this._input.value = ``;
      this._searchButton.classList.add(`visually-hidden`);
      document.removeEventListener(`click`, this._onDocumentClick);
    }
  }

  _onInput() {
    if (this._input.value) {
      this._searchButton.classList.remove(`visually-hidden`);
    } else {
      this._searchButton.classList.add(`visually-hidden`);
    }
  }

  get _template() {
    return creareTemplateSearchForm();
  }
}
