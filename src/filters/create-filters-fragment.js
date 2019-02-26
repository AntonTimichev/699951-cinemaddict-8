import {capitalizeFirstLetter, createElement} from "../utils";

export const FiltersData = [
  {
    id: `all`,
    label: `All movies`,
    isActive: true
  },
  {
    id: `watchlist`,
    count: 13
  },
  {
    id: `history`,
    count: 4
  },
  {
    id: `favorites`,
    count: 8
  },
  {
    id: `stats`,
    additional: true
  },
];

function createFilterTemplate({id, label = capitalizeFirstLetter(id), count = 0, isActive = false, additional = false}) {
  const className = `"main-navigation__item 
  ${isActive ? `main-navigation__item--active` : ``} 
  ${additional ? `main-navigation__item--additional` : ``}"`;
  return `<a href="#${id}" class=${className}>${label} ${count ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`;
}

export function createFilterElement(filterInfo) {
  const template = createFilterTemplate(filterInfo);
  return createElement(template);
}
