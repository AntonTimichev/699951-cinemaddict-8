function createCardTemplate(data) {
  const {title, rating, src, description = false, comments, controls = false, info} = data;
  return `<article class="film-card ${!controls ? `film-card--no-controls` : ``}">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      ${createCardInfo(info)}
    </p>
    <img src=${src} alt="" class="film-card__poster">
    ${description ? `<p class="film-card__description">${description}</p>` : ``}
    <button class="film-card__comments">${comments}</button>
    
    ${controls ? `<form class="film-card__controls">
      ${createCardForm()}
    </form>` : ``}
    
  </article>`;
}

function createCardInfo(infoData) {
  const {year, duration, genre} = infoData;
  return `<span class="film-card__year">${year}</span>
    <span class="film-card__duration">${duration}</span>
    <span class="film-card__genre">${genre}</span>`;
}

function createCardForm() {
  return `<button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>`;
}

export default createCardTemplate;
