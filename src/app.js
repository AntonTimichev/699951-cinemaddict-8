const containers = {
  filtersContainer: document.querySelector(`.main-navigation`),
  mainFilmsContainer: document.querySelector(`.films-list .films-list__container`),
  topFilmsContainer: document.querySelector(`.films-list--extra:nth-last-child(2) .films-list__container`),
  commentedFilmsContainer: document.querySelector(`.films-list--extra:last-child .films-list__container`)
};

export function getActiveElement() {
  return containers.filtersContainer.querySelector(`.main-navigation__item--active`);
}

export function renderFilters(elements) {
  containers.filtersContainer.innerHTML = ``;
  containers.filtersContainer.appendChild(elements);
}

export function renderCards(elements, tag = `main`) {
  containers[`${tag}FilmsContainer`].innerHTML = ``;
  containers[`${tag}FilmsContainer`].appendChild(elements);
}

export function setAppFilterHandler(handler) {
  containers.filtersContainer.addEventListener(`click`, handler);
}
