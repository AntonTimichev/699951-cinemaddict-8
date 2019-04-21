import Component from "../component";
import {createFilterTemplate} from "./create-filter-template";
import {createCountTemplate} from "./create-count-template";

export default class Filter extends Component {
  constructor(data) {
    super(data);
    this._onFilterButtonClick = this._onFilterButtonClick.bind(this);
  }

  set onChange(func) {
    this._onChange = func;
  }

  get _template() {
    return createFilterTemplate(this._data);
  }

  reRender() {
    const {label, count} = this._data;
    this._element.innerHTML = `${label} ${count ? createCountTemplate(count) : ``}`;
  }

  _bind() {
    this._element.addEventListener(`click`, this._onFilterButtonClick);
  }

  _onFilterButtonClick(evt) {
    evt.preventDefault();
    this._element.classList.add(`main-navigation__item--active`);
    this._onChange(this._element, this._data.id);
  }
}
