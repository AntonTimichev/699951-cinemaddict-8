import {getFiltersFragment} from './filters/create-filters-fragment';
import {getCardsFragments} from './cards/create-cards-fragment';
import {renderFilters, renderCards} from "./app";
import {FilmsData, FiltersData} from './mok-data';

renderFilters(getFiltersFragment(FiltersData));
renderCards(getCardsFragments(FilmsData));
