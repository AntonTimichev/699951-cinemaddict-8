import {createAppTemplate} from "./templates/index";
import {createElement} from "../utils";

let filtersContainer = null;
let mainFilmsContainer = null;
let topFilmsContainer = null;
let commentedFilmsContainer = null;
let activeFilterButton = null;

function createAppElement() {
  const template = createAppTemplate();
  return createElement(template);
}

export function renderMainCards(elements) {
  mainFilmsContainer.innerHTML = ``;
  mainFilmsContainer.appendChild(elements);
}

export function renderTopCards(elements) {
  topFilmsContainer.innerHTML = ``;
  topFilmsContainer.appendChild(elements);
}

export function renderCommentedCards(elements) {
  commentedFilmsContainer.innerHTML = ``;
  commentedFilmsContainer.appendChild(elements);
}

export function setAppFilterHandler(callback) {
  filtersContainer.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    const {target} = evt;
    if (target.closest(`.main-navigation__item`)) {
      if (activeFilterButton) {
        activeFilterButton.classList.remove(`main-navigation__item--active`);
      }
      target.classList.add(`main-navigation__item--active`);
      callback();
      activeFilterButton = target;
    }
  });
}

export function initApp(container) {
  container.innerHTML = ``;
  const appElement = createAppElement();
  filtersContainer = appElement.querySelector(`.main-navigation`);
  mainFilmsContainer = appElement.querySelector(`.films-list .films-list__container`);
  topFilmsContainer = appElement.querySelector(`.films-list--extra:nth-last-child(2) .films-list__container`);
  commentedFilmsContainer = appElement.querySelector(`.films-list--extra:last-child .films-list__container`);
  activeFilterButton = filtersContainer.querySelector(`.main-navigation__item--active`);
  container.appendChild(appElement);
}
