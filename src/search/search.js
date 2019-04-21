import Component from "../component";
import {createTemplateSearchForm} from "./create-template-search-form";

export default class Search extends Component {
  constructor() {
    super();
    this._onTextFieldInput = this._onTextFieldInput.bind(this);
    this._onSearchButtonClick = this._onSearchButtonClick.bind(this);
    this._onDocumentClick = this._onDocumentClick.bind(this);
  }

  set onChange(func) {
    this._onChange = func;
  }

  get _template() {
    return createTemplateSearchForm();
  }

  _bind() {
    this._input = this._element.querySelector(`.search__field`);
    this._input.addEventListener(`input`, this._onTextFieldInput);
    this._searchButton = this._element.querySelector(`button`);
    this._searchButton.addEventListener(`click`, this._onSearchButtonClick);
  }

  _onSearchButtonClick(evt) {
    evt.preventDefault();
    this._onChange(this._input.value);
    document.addEventListener(`click`, this._onDocumentClick);
  }

  _onDocumentClick(evt) {
    if (!evt.target.closest(`.header__search`) && !evt.target.closest(`.films-list__show-more`)) {
      this._input.value = ``;
      this._searchButton.classList.add(`visually-hidden`);
      document.removeEventListener(`click`, this._onDocumentClick);
    }
  }

  _onTextFieldInput() {
    if (this._input.value) {
      this._searchButton.classList.remove(`visually-hidden`);
    } else {
      this._searchButton.classList.add(`visually-hidden`);
    }
  }
}
