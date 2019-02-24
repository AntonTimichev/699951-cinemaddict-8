const filtersContainer = document.querySelector(`.main-navigation`);
const filmsMainContainer = document.querySelector(`.films-list .films-list__container`);
const filmsTopContainer = document.querySelector(`.films-list--extra:nth-last-child(2) .films-list__container`);
const filmsCommentedContainer = document.querySelector(`.films-list--extra:last-child .films-list__container`);

export function renderFilters(elements) {
  filtersContainer.innerHTML = ``;
  filtersContainer.appendChild(elements);
}

export function renderCards(elements) {
  const {main, top, commented} = elements;
  filmsMainContainer.innerHTML = ``;
  filmsTopContainer.innerHTML = ``;
  filmsCommentedContainer.innerHTML = ``;
  filmsMainContainer.appendChild(main);
  filmsTopContainer.appendChild(top);
  filmsCommentedContainer.appendChild(commented);
}
