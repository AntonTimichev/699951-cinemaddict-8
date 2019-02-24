import {createCardTemplate} from './create-template';
import {createElement} from "../utils";

function createCardElement(card) {
  const template = createCardTemplate(card);
  return createElement(template);
}

export function getCardsFragments(data) {
  const cardsMainFragment = document.createDocumentFragment();
  const cardsTopFragment = document.createDocumentFragment();
  const cardsCommentedFragment = document.createDocumentFragment();
  data.forEach((settings) => {
    const {box = `main`, ...other} = settings;
    switch (box) {
      case `main`: cardsMainFragment.appendChild(createCardElement(other));
        break;
      case `top`: cardsTopFragment.appendChild(createCardElement(other));
        break;
      case `commented`: cardsCommentedFragment.appendChild(createCardElement(other));
        break;
      default: break;
    }
  });
  return {
    main: cardsMainFragment,
    top: cardsTopFragment,
    commented: cardsCommentedFragment
  };
}
