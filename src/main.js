import {getFiltersFragment} from './filters/create-filters-fragment';
import {getCardsFragments} from './cards/create-cards-fragment';
import {renderFilters, renderMainCards, renderExtraCards} from "./app";
import {FilmsData} from './mok-data';

const {mainBlockCards, ...otherCards} = getCardsFragments(FilmsData);

renderFilters(getFiltersFragment());
renderMainCards(mainBlockCards);
renderExtraCards(otherCards);
