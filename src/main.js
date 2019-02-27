import {createCardElement} from './cards/create-cards-fragment';
import {renderMainCards, renderTopCards, renderCommentedCards, setAppFilterHandler, initApp} from "./app-block/app";
import {FilmsData} from './mok-data';
import {sortCards, getRandomInteger, createFragment} from "./utils";

const {main: mainCards, top: topCards, commented: commentedCards} = sortCards(FilmsData);

initApp(document.querySelector(`main`));
renderMainCards(createFragment(mainCards, createCardElement));
renderTopCards(createFragment(topCards, createCardElement));
renderCommentedCards(createFragment(commentedCards, createCardElement));
setAppFilterHandler(changeFilterValueHandler);

function changeFilterValueHandler() {
  const data = mainCards.slice(getRandomInteger(1, mainCards.length - 1));
  renderMainCards(createFragment(data, createCardElement));
}

