import {renderMainCards, renderTopCards, renderCommentedCards, initApp} from "./app-block/app";
import {filmsData} from './mok-data';
import {getCardsDataForContainers} from "./utils";

const [mainCards, topCards, commentedCards] = getCardsDataForContainers(filmsData);

initApp(document.querySelector(`main`));

renderMainCards(mainCards);
renderTopCards(topCards);
renderCommentedCards(commentedCards);
