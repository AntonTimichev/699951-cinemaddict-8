import {Card} from './card/Card';
import {Popup} from "./popup-card/Popup-Card";
import {renderMainCards, renderTopCards, renderCommentedCards, initApp, setFilterHandler} from "./app-block/app";
import {filmsData} from './mok-data';
import {getCardsDataForContainers, createFragment, getElementsOfInstances} from "./utils";
import * as _ from 'lodash';

const body = document.querySelector(`body`);
const getInstancesOfCards = (data) => data.map((info) => {
  const card = new Card(_.cloneDeep(info));
  card.onClick = (copyData) => {
    const popup = new Popup(copyData);
    popup.onSubmit = (newObject) => {
      card.update(newObject);
      card.refresh();
      updateInitialData(card.data, mainCards);
    };
    body.appendChild(popup.render());
  };
  card.onAddToWatchList = (cardData) => {
    cardData.watchlist = !cardData.watchlist;
    updateInitialData(cardData, mainCards);
  };
  card.onMarkAsWatched = (cardData) => {
    cardData.watched = !cardData.watched;
    updateInitialData(cardData, mainCards);
  };
  return card;
});

const [mainCards, topCards, commentedCards] = getCardsDataForContainers(filmsData.slice());
let [mainInstances, topInstances, commentedInstances] = getInstancesForContainers(mainCards, topCards, commentedCards);

initApp(document.querySelector(`main`));
setFilterHandler(changeFilterValueHandler);
renderMainCards(createFragment(getElementsOfInstances(mainInstances)));
renderTopCards(createFragment(getElementsOfInstances(topInstances)));
renderCommentedCards(createFragment(getElementsOfInstances(commentedInstances)));


function changeFilterValueHandler(filterId) {
  if (filterId !== `all`) {
    if (filterId === `history`) {
      filterId = `watched`;
    }
    const filteredCards = getFilteredCards(mainCards, filterId);
    mainInstances = getInstancesOfCards(filteredCards);
  } else {
    mainInstances = getInstancesOfCards(mainCards);
  }
  renderMainCards(createFragment(getElementsOfInstances(mainInstances)));
  return mainInstances.length;
}

function getInstancesForContainers(...allCards) {
  return allCards.map((cards) => {
    return getInstancesOfCards(cards);
  });
}

function getFilteredCards(cardsData, id) {
  return cardsData.filter((cardInfo) => {
    return cardInfo[id] === true;
  });
}

function updateInitialData(data, cards) {
  const index = cards.findIndex((card) => card.id === data.id);
  if (index !== -1) {
    cards[index] = _.cloneDeep(data);
  }
}
