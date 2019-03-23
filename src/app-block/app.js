import {createAppTemplate} from "./templates/index";
import {createElement, createFragment, getElementsOfInstances} from "../utils";
import {Filter} from "../filter/FIlter";

let filtersContainer = null;
let mainFilmsContainer = null;
let topFilmsContainer = null;
let commentedFilmsContainer = null;
let activeFilterButton = null;

function createAppElement() {
  const template = createAppTemplate();
  return createElement(template);
}

export const FiltersSettings = [
  {
    id: `all`,
    label: `All movies`,
    isActive: true
  },
  {
    id: `watchlist`,
    label: `Watchlist`,
    count: 0
  },
  {
    id: `history`,
    label: `History`,
    count: 0
  },
  {
    id: `favorites`,
    label: `Favorites`,
    count: 0
  },
  {
    id: `stats`,
    label: `Stats`,
    additional: true
  },
];

export function renderMainCards(elements) {
  mainFilmsContainer.innerHTML = ``;
  mainFilmsContainer.appendChild(elements);
}

export function renderTopCards(elements) {
  topFilmsContainer.innerHTML = ``;
  topFilmsContainer.appendChild(elements);
}

export function renderCommentedCards(elements) {
  commentedFilmsContainer.innerHTML = ``;
  commentedFilmsContainer.appendChild(elements);
}

export function renderFilters(elements) {
  filtersContainer.innerHTML = ``;
  filtersContainer.appendChild(elements);
}

export function setFilterHandler(callback) {
  const filtersInstances = FiltersSettings.map((info) => {
    const filter = new Filter(info);
    filter.onChange = (element, filterId) => {
      if (activeFilterButton) {
        activeFilterButton.classList.remove(`main-navigation__item--active`);
      }
      element.classList.add(`main-navigation__item--active`);
      activeFilterButton = element;
      const count = callback(filterId);
      if (filterId !== `all`) {
        filter.update({count});
      }
      filter.rerender();
    };
    return filter;
  });
  renderFilters(createFragment(getElementsOfInstances(filtersInstances)));
  activeFilterButton = filtersContainer.querySelector(`.main-navigation__item--active`);
}

export function initApp(container) {
  container.innerHTML = ``;
  const appElement = createAppElement();
  filtersContainer = appElement.querySelector(`.main-navigation`);
  mainFilmsContainer = appElement.querySelector(`.films-list .films-list__container`);
  topFilmsContainer = appElement.querySelector(`.films-list--extra:nth-last-child(2) .films-list__container`);
  commentedFilmsContainer = appElement.querySelector(`.films-list--extra:last-child .films-list__container`);
  container.appendChild(appElement);
}
