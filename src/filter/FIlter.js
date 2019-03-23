import {Component} from "../Component";
import {createFilterTemplate} from "./create-filter-template";
import {createCountTemplate} from "./create-count-template";

export class Filter extends Component {
  constructor(data) {
    super(data);
    this._onFilterButtonClick = this._onFilterButtonClick.bind(this);
  }

  _onFilterButtonClick(evt) {
    evt.preventDefault();
    const newObj = this._onFilter(this._element, this._data.id);
    this.update(newObj);
  }

  rerender() {
    const {label, count} = this._data;
    this._element.innerHTML = `${label} ${count ? createCountTemplate(count) : ``}`;
  }

  set onChange(func) {
    this._onFilter = func;
  }

  bind() {
    this._element.addEventListener(`click`, this._onFilterButtonClick);
  }

  get template() {
    return createFilterTemplate(this._data);
  }
}
