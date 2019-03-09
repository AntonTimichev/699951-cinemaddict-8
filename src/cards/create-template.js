function prepareDataForTemplate(data) {
  const {
    title = ``,
    originTitle = ``,
    actors = [],
    seasons = {},
    ageLimit = `16+`,
    premiere = `2019`,
    releaseDate = ``,
    rate = ``,
    country = ``,
    marks = {
      favorites: false,
      seen: false,
      look: true
    },
    rating = `9.8`,
    info = {
      year: `2018`,
      duration: `1h 13m`,
      genre: `Comedy`
    },
    src = `./images/posters/moonrise.jpg`,
    description = ``,
    comments = ``,
    controls = true,
    ...settings
  } = data;

  return {
    title,
    rating,
    info,
    src,
    originTitle,
    actors,
    seasons,
    ageLimit,
    premiere,
    releaseDate,
    rate,
    country,
    marks,
    description,
    comments,
    controls,
    ...settings
  };
}

export function createCardTemplate(data) {
  const {title, rating, src, description = false, comments, controls, info} = prepareDataForTemplate(data);
  return `<article class="film-card ${!controls ? `film-card--no-controls` : ``}">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    ${createCardInfo(info)}
    <img src=${src} alt="" class="film-card__poster">
    ${description ? `<p class="film-card__description">${description}</p>` : ``}
    <button class="film-card__comments">${comments} comments</button>
    
    ${controls ? createCardForm() : ``}
  </article>`;
}

function createCardInfo(infoData) {
  const {year, duration, genre} = infoData;
  return `<p class="film-card__info">
    <span class="film-card__year">${year}</span>
    <span class="film-card__duration">${duration}</span>
    <span class="film-card__genre">${genre}</span>
  </p>`;
}

function createCardForm() {
  return `<form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
  </form>`;
}
