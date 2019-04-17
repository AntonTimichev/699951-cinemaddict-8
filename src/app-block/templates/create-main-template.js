import {createNavigationTemplate} from "./create-navigation-template";
import {createCardsSectionTemplate} from "./create-cards-section-template";

export function createMainTemplate() {
  return `<main class="main">
      ${createNavigationTemplate()}
      ${createCardsSectionTemplate()}
    </main>`;
}
