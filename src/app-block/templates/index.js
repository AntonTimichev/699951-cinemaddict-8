import {createNavigationTemplate} from "./create-navigation-template";
import {createCardsSectionTemplate} from "./create-cards-section-template";

export function createAppTemplate() {
  return `${createNavigationTemplate()}
    ${createCardsSectionTemplate()}`;
}
