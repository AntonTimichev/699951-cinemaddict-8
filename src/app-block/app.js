import {createAppTemplate} from "./templates/index";
import {createElement, createFragment, getCardsDataForContainers, getElementsOfInstances} from "../utils";
import {Card} from "../card/Card";
import {Popup} from "../popup-card/Popup-Card";
import {Filter} from "../filter/FIlter";
import {Statistic} from "../statistic/Statistic";
import {API} from "../Api";
import {Store} from "../Store";
import {Provider} from "../Provider";
import {cloneDeep} from 'lodash';

let api = null;
let store = null;
let provider = null;
let main = null;
let filtersContainer = null;
let mainFilmsContainer = null;
let topFilmsContainer = null;
let commentedFilmsContainer = null;
let activeFilterButton = null;
let filmsSection = null;
let statistic = null;
let mainCardsData = null;

function createAppElement() {
  const template = createAppTemplate();
  return createElement(template);
}

const FiltersSettings = [
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

function changeFilterValueForCards(filterId) {
  mainCardsData = provider.getAllData();
  if (filterId === `history`) {
    filterId = `watched`;
  }
  switch (filterId) {
    case `watchlist`:
    case `favorite`:
    case `watched` :
    case `all`: mainCardsData = getFilteredCardsData(provider.getAllData(), filterId);
      hideStatistic();
      renderMainCards(mainCardsData);
      break;
    case `stats`:
      if (statistic.isChanged) {
        statistic.changeView(mainCardsData);
        statistic.isChanged = false;
      }
      statistic.showDiagram();
      showStatistic();
      break;
  }
}

function showStatistic() {
  filmsSection.classList.add(`visually-hidden`);
  statistic.element.classList.remove(`visually-hidden`);
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

const getInstancesOfCards = (data) => data.map((info) => {
  const card = new Card(cloneDeep(info));
  card.onClick = (copyData) => {
    const popup = new Popup(copyData);
    popup.onSubmit = (newData) => {
      provider.updateMovie(newData.id, newData)
        .then(() => {
          popup.processResponse();
          card.update(newData);
          card.rerender();
          statistic.isChanged = true;
          changeFilter(`watchlist`, `history`);
        })
        .catch(() => {
          popup.shakeForm();
          popup.processResponse(false);
        });
    };
    document.body.appendChild(popup.render());
  };
  card.onAddToWatchList = (cardData) => {
    cardData.watchlist = !cardData.watchlist;
    provider.updateMovie(cardData.id, cardData)
      .then(() => {
        card.processResponse();
        statistic.isChanged = true;
        changeFilter(`watchlist`);
      })
      .catch(() => {
        card.processResponse(false);
      });
  };
  card.onMarkAsWatched = (cardData) => {
    cardData.watched = !cardData.watched;
    provider.updateMovie(cardData.id, cardData)
      .then(() => {
        card.processResponse();
        statistic.isChanged = true;
        changeFilter(`history`);
      })
      .catch(() => {
        card.processResponse(false);
      });
  };
  return card;
});

function changeFilter(...filtersId) {
  filtersId.forEach((filterId) => {
    const filterInstance = filtersInstances.find((filterInst) => filterInst._data.id === filterId);
    if (filterId === `history`) {
      filterId = `watched`;
    }
    filterInstance.update({count: provider.getAllData().filter((item) => item[filterId]).length});
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
  changeFilter(`watchlist`, `history`);
  activeFilterButton = filtersContainer.querySelector(`.main-navigation__item--active`);
}

function getFilteredCardsData(cardsData, id) {
  if (id === `all`) {
    return cardsData;
  } else {
    return cardsData.filter((cardInfo) => {
      return cardInfo[id];
    });
  }
}

export function initApp({endPoint, authorization}, key, container) {
  main = container;
  api = new API({endPoint, authorization});
  store = new Store({key, storage: localStorage});
  provider = new Provider({api, store});
  window.addEventListener(`offline`, () => {
    document.title = `${document.title}[OFFLINE]`;
  });
  window.addEventListener(`online`, () => {
    document.title = document.title.split(`[OFFLINE]`)[0];
    provider.syncMovies();
  });
  provider.getMovies()
    .then(() => {
      const [mainCards, topCards, commentedCards] = getCardsDataForContainers(provider.getAllData());
      const appElement = createAppElement();
      filtersContainer = appElement.querySelector(`.main-navigation`);
      mainFilmsContainer = appElement.querySelector(`.films-list .films-list__container`);
      topFilmsContainer = appElement.querySelector(`.films-list--extra:nth-last-child(2) .films-list__container`);
      commentedFilmsContainer = appElement.querySelector(`.films-list--extra:last-child .films-list__container`);
      filmsSection = appElement.querySelector(`.films`);
      main.innerHTML = ``;
      main.appendChild(appElement);
      initFilters();
      statistic = new Statistic(cloneDeep(provider.getAllData()));
      main.appendChild(statistic.render());
      renderMainCards(mainCards);
      renderTopCards(topCards);
      renderCommentedCards(commentedCards);
    }).catch(() => {
      main.querySelector(`.modal_container`).innerText = `Something went wrong while loading movies. Check your connection or try again later`;
    });
}
