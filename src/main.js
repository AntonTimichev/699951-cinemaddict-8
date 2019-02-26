import {createFilterElement, FiltersData} from './filters/create-filters-fragment';
import {createCardElement} from './cards/create-cards-fragment';
import {renderFilters, renderCards, setAppFilterHandler, getActiveElement} from "./app";
import {FilmsData} from './mok-data';
import {sortCards, getRandomInteger, createFragment} from "./utils";

const {main: mainCards, top: topCards, commented: commentedCards} = sortCards(FilmsData);

renderFilters(createFragment(FiltersData, createFilterElement));
renderCards(createFragment(mainCards, createCardElement));
renderCards(createFragment(topCards, createCardElement), topCards[0].box);
renderCards(createFragment(commentedCards, createCardElement), commentedCards[0].box);
setAppFilterHandler(changeFilterValueHandler);

function changeFilterValueHandler(evt) {
  const activatedFilter = evt.target.closest(`.main-navigation__item`);
  if (activatedFilter) {
    const currentActiveElement = getActiveElement();
    currentActiveElement.classList.remove(`main-navigation__item--active`);
    activatedFilter.classList.add(`main-navigation__item--active`);
    const data = mainCards.slice(getRandomInteger(1, mainCards.length - 1));
    renderCards(createFragment(data, createCardElement));
  }
}

