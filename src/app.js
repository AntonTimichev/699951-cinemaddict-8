const filtersContainer = document.querySelector(`.main-navigation`);
const filmsMainContainer = document.querySelector(`.films-list .films-list__container`);
const filmsTopContainer = document.querySelector(`.films-list--extra:nth-last-child(2) .films-list__container`);
const filmsCommentedContainer = document.querySelector(`.films-list--extra:last-child .films-list__container`);

export function renderFilters(elements) {
  filtersContainer.innerHTML = ``;
  filtersContainer.appendChild(elements);
}

export function renderMainCards(elements) {
  filmsMainContainer.innerHTML = ``;
  filmsMainContainer.appendChild(elements);
}

export function renderExtraCards(elements) {
  const {topBlockCards, commentedBlockCards} = elements;
  filmsTopContainer.innerHTML = ``;
  filmsCommentedContainer.innerHTML = ``;
  filmsTopContainer.appendChild(topBlockCards);
  filmsCommentedContainer.appendChild(commentedBlockCards);
}
