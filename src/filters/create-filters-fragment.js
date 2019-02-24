import {capitalizeFirstLetter, createElement} from "../utils";

function createFilterTemplate({id, label = capitalizeFirstLetter(id), count = 0, isActive = false, additional = false}) {
  const className = `"main-navigation__item 
  ${isActive ? `main-navigation__item--active` : ``} 
  ${additional ? `main-navigation__item--additional` : ``}"`;
  return `<a href="#${id}" class=${className}>${label} ${count ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`;
}

function getFilterElement(filterInfo) {
  const template = createFilterTemplate(filterInfo);
  return createElement(template);
}

export function getFiltersFragment(data) {
  const filtersFragment = document.createDocumentFragment();
  data.forEach((filterInfo) => filtersFragment.appendChild(getFilterElement(filterInfo)));
  return filtersFragment;
}
