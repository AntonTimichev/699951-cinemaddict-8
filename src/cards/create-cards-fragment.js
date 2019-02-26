import {createCardTemplate} from './create-template';
import {createElement} from "../utils";

export function createCardElement(card) {
  const template = createCardTemplate(card);
  return createElement(template);
}
