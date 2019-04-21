import {createNavigationTemplate} from "./create-navigation-template";
import {createCardsSectionTemplate} from "./create-cards-section-template";

export const createMainTemplate = () => `
  <main class="main">
    ${createNavigationTemplate()}
    ${createCardsSectionTemplate()}
  </main>`;
