import {Card} from './card/Card';
import {Popup} from "./popup-card/Popup-Card";
import {renderMainCards, renderTopCards, renderCommentedCards, setAppFilterHandler, initApp, refreshCard} from "./app-block/app";
import {FilmsData} from './mok-data';
import {getCardsDataForContainers, getRandomInteger, createFragment} from "./utils";

const body = document.querySelector(`body`);
const getInstances = (data) => data.map((info) => {
  const card = new Card(info);
  card.onClick = (copyData) => {
    const currentCard = card.element;
    const popup = new Popup(copyData);
    popup.onSubmit = (newObject) => {
      card.update(newObject);
      refreshCard(card.render(), currentCard);
    };
    body.appendChild(popup.render());
  };
  return card;
});
const getElementsOfInstances = (instances) => instances.map((instance) => instance.render());
const {main: mainCards, top: topCards, commented: commentedCards} = getCardsDataForContainers(FilmsData.slice());
const mainInstances = getInstances(mainCards);
const topInstances = getInstances(topCards);
const commentedInstances = getInstances(commentedCards);

initApp(document.querySelector(`main`));
renderMainCards(createFragment(getElementsOfInstances(mainInstances)));
renderTopCards(createFragment(getElementsOfInstances(topInstances)));
renderCommentedCards(createFragment(getElementsOfInstances(commentedInstances)));
setAppFilterHandler(changeFilterValueHandler);

function changeFilterValueHandler() {
  const data = mainInstances.slice(getRandomInteger(1, mainInstances.length - 1));
  renderMainCards(createFragment(getElementsOfInstances(data)));
}
