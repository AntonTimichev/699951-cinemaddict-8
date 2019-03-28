import {createAppTemplate} from "./templates/index";
import {createElement, createFragment, getElementsOfInstances} from "../utils";
import {Card} from "../card/Card";
import {Popup} from "../popup-card/Popup-Card";
import {Filter} from "../filter/FIlter";
import {filmsData} from "../mok-data";
import {cloneDeep} from 'lodash';
import {Statistic} from "../statistic/Statistic";

let state = {
  isChanged: false
};
let main = null;
let filtersContainer = null;
let mainFilmsContainer = null;
let topFilmsContainer = null;
let commentedFilmsContainer = null;
let activeFilterButton = null;
let filmsSection = null;
let statistic = null;

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

let mainCardsData = filmsData;

function changeFilterValueForCards(filterId) {
  mainCardsData = filmsData;
  if (filterId === `history`) {
    filterId = `watched`;
  }
  switch (filterId) {
    case `watchlist`:
    case `favorite`:
    case `watched` : mainCardsData = getFilteredCardsData(filmsData, filterId);
      hideStatistic();
      break;
    case `stats`:
      if (state.isChanged) {
        statistic.data = mainCardsData;
      }
      statistic.render();
      statistic.showDiagram();
      main.appendChild(statistic.element);
      filmsSection.classList.add(`visually-hidden`);
      statistic.element.classList.remove(`visually-hidden`);
      return;
    default: hideStatistic();
      break;
  }
  renderMainCards(mainCardsData);
}

function hideStatistic() {
  if (filmsSection.classList.contains(`visually-hidden`)) {
    filmsSection.classList.remove(`visually-hidden`);
    statistic.element.classList.add(`visually-hidden`);
  }
}

const filtersInstances = FiltersSettings.map((info) => {
  const filter = new Filter(info);
  filter.onChange = (element, filterId) => {
    if (activeFilterButton) {
      activeFilterButton.classList.remove(`main-navigation__item--active`);
    }
    element.classList.add(`main-navigation__item--active`);
    activeFilterButton = element;
    changeFilterValueForCards(filterId);
  };
  return filter;
});

function updateInitialData(data, cards) {
  state.isChanged = true;
  const index = cards.findIndex((card) => card.id === data.id);
  if (index !== -1) {
    cards[index] = cloneDeep(data);
  }
}

const getInstancesOfCards = (data) => data.map((info) => {
  const card = new Card(cloneDeep(info));
  card.onClick = (copyData) => {
    const popup = new Popup(copyData);
    popup.onSubmit = (newObject) => {
      card.update(newObject);
      card.rerender();
      updateInitialData(card.data, filmsData);
      processFilter(`watchlist`, `history`);
    };
    document.body.appendChild(popup.render());
  };
  card.onAddToWatchList = (cardData) => {
    cardData.watchlist = !cardData.watchlist;
    updateInitialData(cardData, filmsData);
    processFilter(`watchlist`);
  };
  card.onMarkAsWatched = (cardData) => {
    cardData.watched = !cardData.watched;
    updateInitialData(cardData, filmsData);
    processFilter(`history`);
  };
  return card;
});

function processFilter(...filtersId) {
  filtersId.forEach((filterId) => {
    const filterInstance = filtersInstances.find((filterInst) => filterInst._data.id === filterId);
    if (filterId === `history`) {
      filterId = `watched`;
    }
    filterInstance.update({count: filmsData.filter((item) => item[filterId]).length});
    filterInstance.rerender();
  });
}

export function renderMainCards(data) {
  mainFilmsContainer.innerHTML = ``;
  const instances = getInstancesOfCards(data);
  const elements = createFragment(getElementsOfInstances(instances));
  mainFilmsContainer.appendChild(elements);
}

export function renderTopCards(data) {
  topFilmsContainer.innerHTML = ``;
  const instances = getInstancesOfCards(data);
  const elements = createFragment(getElementsOfInstances(instances));
  topFilmsContainer.appendChild(elements);
}

export function renderCommentedCards(data) {
  commentedFilmsContainer.innerHTML = ``;
  const instances = getInstancesOfCards(data);
  const elements = createFragment(getElementsOfInstances(instances));
  commentedFilmsContainer.appendChild(elements);
}

export function renderFilters(elements) {
  filtersContainer.innerHTML = ``;
  filtersContainer.appendChild(elements);
}

export function initFilters() {
  renderFilters(createFragment(getElementsOfInstances(filtersInstances)));
  processFilter(`watchlist`, `history`);
  activeFilterButton = filtersContainer.querySelector(`.main-navigation__item--active`);
}

function getFilteredCardsData(cardsData, id) {
  return cardsData.filter((cardInfo) => {
    return cardInfo[id];
  });
}

export function initApp(container) {
  main = container;
  main.innerHTML = ``;
  const appElement = createAppElement();
  filtersContainer = appElement.querySelector(`.main-navigation`);
  mainFilmsContainer = appElement.querySelector(`.films-list .films-list__container`);
  topFilmsContainer = appElement.querySelector(`.films-list--extra:nth-last-child(2) .films-list__container`);
  commentedFilmsContainer = appElement.querySelector(`.films-list--extra:last-child .films-list__container`);
  filmsSection = appElement.querySelector(`.films`);
  main.appendChild(appElement);
  initFilters();
  statistic = new Statistic(cloneDeep(mainCardsData));
}
