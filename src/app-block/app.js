import {createAppTemplate} from "./templates/index";
import {createElement, createFragment, getCardsDataForContainers, getElementsOfInstances} from "../utils";
import Card from "../card/card";
import Popup from "../popup-card/popup-card";
import Filter from "../filter/filter";
import Statistic from "../statistic/statistic";
import API from "../api";
import Store from "../store";
import Provider from "../provider";
import Search from "../search/search";
import {cloneDeep} from 'lodash';

const CARDS_COUNT = 5;
const FILTERS_SETTINGS = [
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
    id: `favorite`,
    label: `Favorite`,
    count: 0
  },
  {
    id: `stats`,
    label: `Stats`,
    additional: true
  },
];
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
let header = null;
let headerProfile = null;
let showMoreButton = null;
let startIndex = 0;
let mainCards = null;
let topCards = null;
let commentedCards = null;

const createAppElement = () => {
  const template = createAppTemplate();
  return createElement(template);
};

const getFilteredByNameData = (subStr) => provider.getAllData().filter((card) => card.title.toLowerCase().includes(subStr.toLowerCase()));

const initHeader = (container) => {
  headerProfile = container.querySelector(`.header__profile`);
  const search = new Search();
  search.onChange = (subStr) => {
    setInitShowMoreButton();
    hideStatistic();
    changeActiveFilter();
    mainCards = getFilteredByNameData(subStr);
    renderMainCards(getRenderedMainCards());
  };
  container.insertBefore(search.render(), headerProfile);
};

const onShowMoreButtonClick = () => {
  const renderedCards = getRenderedMainCards();
  renderMainCards(renderedCards, true);
};

const getRenderedMainCards = () => {
  const lastIndex = startIndex + CARDS_COUNT;
  const cards = mainCards.slice(startIndex, lastIndex);
  startIndex = lastIndex;
  if (startIndex >= mainCards.length) {
    showMoreButton.classList.add(`visually-hidden`);
  }
  return cards;
};

const changeUserRank = () => {
  const count = provider.getAllData().filter((item) => item[`watched`]).length;
  let rank = ``;
  if (count >= 1 && count <= 7) {
    rank = `novice`;
  } else if (count >= 8 && count <= 15) {
    rank = `fan`;
  } else if (count >= 16) {
    rank = `movie buff`;
  }
  headerProfile.innerHTML = `<p class="profile__rating">${rank}</p>`;
};

const getFilteredCardsData = (cardsData, id) => id === `all` ? cardsData : cardsData.filter((cardInfo) => cardInfo[id]);

const changeFilterValueForCards = (filterId) => {
  mainCards = provider.getAllData();
  if (filterId === `history`) {
    filterId = `watched`;
  }
  switch (filterId) {
    case `watchlist`:
    case `favorite`:
    case `watched`:
    case `all`:
      mainCards = getFilteredCardsData(provider.getAllData(), filterId);
      hideStatistic();
      renderMainCards(getRenderedMainCards());
      break;
    case `stats`:
      if (statistic.isChanged) {
        statistic.updateDiagram(mainCards);
      }
      statistic.isChanged = false;
      showStatistic();
      break;
  }
};

const showStatistic = () => {
  filmsSection.classList.add(`visually-hidden`);
  statistic.show();
};

const hideStatistic = () => {
  if (filmsSection.classList.contains(`visually-hidden`)) {
    filmsSection.classList.remove(`visually-hidden`);
    statistic.hide();
  }
};

const filtersInstances = FILTERS_SETTINGS.map((info) => {
  const filter = new Filter(info);
  filter.onChange = (element, filterId) => {
    setInitShowMoreButton();
    changeActiveFilter(element);
    changeFilterValueForCards(filterId);
  };
  return filter;
});

const changeActiveFilter = (filter = null) => {
  if (activeFilterButton) {
    activeFilterButton.classList.remove(`main-navigation__item--active`);
  }
  activeFilterButton = filter ? filter : null;
};

const setInitShowMoreButton = () => {
  startIndex = 0;
  if (showMoreButton.classList.contains(`visually-hidden`)) {
    showMoreButton.classList.remove(`visually-hidden`);
  }
};

const getInstancesOfCards = (data, hasControl = false) => {
  return data.map((info) => {
    const card = new Card(cloneDeep(info));
    card.hasControl = hasControl;
    card.onClick = (copyData) => {
      const popup = new Popup(copyData);
      popup.onSubmit = (newData) => {
        provider.updateMovie(newData.id, newData)
          .then(() => {
            popup.processResponse();
            card.update(newData);
            card.reRender();
            if (newData.watched) {
              statistic.isChanged = true;
            }
            changeFilter(`watchlist`, `history`, `favorite`);
            changeUserRank();
          })
          .catch(() => {
            popup.showErrorOfForm();
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
          changeUserRank();
        })
        .catch(() => {
          card.processResponse(false);
        });
    };
    card.onMarkAsFavorite = (cardData) => {
      cardData.favorite = !cardData.favorite;
      provider.updateMovie(cardData.id, cardData)
        .then(() => {
          card.processResponse();
          changeFilter(`favorite`);
        })
        .catch(() => {
          card.processResponse(false);
        });
    };
    return card;
  });
};

const changeFilter = (...filtersId) => {
  filtersId.forEach((filterId) => {
    const filterInstance = filtersInstances.find((filterInst) => filterInst._data.id === filterId);
    if (filterId === `history`) {
      filterId = `watched`;
    }
    filterInstance.update({count: provider.getAllData().filter((item) => item[filterId]).length});
    filterInstance.reRender();
  });
};

export const renderMainCards = (data, isAdded = false) => {
  if (!isAdded) {
    mainFilmsContainer.innerHTML = ``;
  }
  const instances = getInstancesOfCards(data, true);
  const elements = createFragment(getElementsOfInstances(instances));
  mainFilmsContainer.appendChild(elements);
};

export const renderTopCards = (data) => {
  topFilmsContainer.innerHTML = ``;
  const instances = getInstancesOfCards(data);
  const elements = createFragment(getElementsOfInstances(instances));
  topFilmsContainer.appendChild(elements);
};

export const renderCommentedCards = (data) => {
  commentedFilmsContainer.innerHTML = ``;
  const instances = getInstancesOfCards(data);
  const elements = createFragment(getElementsOfInstances(instances));
  commentedFilmsContainer.appendChild(elements);
};

export const renderFilters = (elements) => {
  filtersContainer.innerHTML = ``;
  filtersContainer.appendChild(elements);
};

export const initFilters = () => {
  renderFilters(createFragment(getElementsOfInstances(filtersInstances)));
  changeFilter(`watchlist`, `history`, `favorite`);
  changeUserRank();
  activeFilterButton = filtersContainer.querySelector(`.main-navigation__item--active`);
};

export const initApp = ({endPoint, authorization}, key, container) => {
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
      [mainCards, topCards, commentedCards] = getCardsDataForContainers(provider.getAllData());
      const app = createAppElement();
      header = app.querySelector(`header.header`);
      initHeader(header);
      main = app.querySelector(`main`);
      filtersContainer = main.querySelector(`.main-navigation`);
      mainFilmsContainer = main.querySelector(`.films-list .films-list__container`);
      topFilmsContainer = main.querySelector(`.films-list--extra:nth-last-child(2) .films-list__container`);
      commentedFilmsContainer = main.querySelector(`.films-list--extra:last-child .films-list__container`);
      filmsSection = main.querySelector(`.films`);
      const footerStatistic = app.querySelector(`.footer__statistics`);
      footerStatistic.innerHTML = `<p>${mainCards.length} movies inside</p>`;
      showMoreButton = main.querySelector(`.films-list__show-more`);
      showMoreButton.addEventListener(`click`, onShowMoreButtonClick);
      container.innerHTML = ``;
      container.appendChild(app);
      initFilters();
      statistic = new Statistic(cloneDeep(provider.getAllData()));
      statistic.isChanged = true;
      main.appendChild(statistic.render());
      renderMainCards(getRenderedMainCards());
      renderTopCards(topCards);
      renderCommentedCards(commentedCards);
    }).catch(() => {
      container.querySelector(`.modal_container`).innerText = `Something went wrong while loading movies. Check your connection or try again later`;
    });
};
