import {createHeaderTemplate} from "./create-header-template";
import {createMainTemplate} from "./create-main-template";
import {createFooterTemplate} from "./create-footer-template";

export function createAppTemplate() {
  return `${createHeaderTemplate()}
    ${createMainTemplate()}
    ${createFooterTemplate()}`;
}

// import {createNavigationTemplate} from "./create-navigation-_template";
// import {createCardsSectionTemplate} from "./create-cards-section-_template";
//
// export function createAppTemplate() {
//   return `${createNavigationTemplate()}
//     ${createCardsSectionTemplate()}`;
// }
