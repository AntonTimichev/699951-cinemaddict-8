import moment from 'moment';

function prepareDataForTemplate(data) {
  const {
    title = ``,
    rating = ``,
    info = {
      year: ``,
      duration: ``,
      genre: ``
    },
    src = ``,
    description = ``,
    comments = [],
    controls = true,
    ...settings
  } = data;

  return {
    title,
    rating,
    info,
    src,
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
    <button class="film-card__comments">${comments.length} comments</button>
    
    ${controls ? createFormofCardControls() : ``}
  </article>`;
}

function createCardInfo(infoData) {
  const {yearTime, duration, genre} = infoData;
  const runTime = moment.duration(duration).asMinutes();
  const year = moment(yearTime).format(`YYYY`);
  return `<p class="film-card__info">
    <span class="film-card__year">${year}</span>
    <span class="film-card__duration">${runTime}m</span>
    <span class="film-card__genre">${genre}</span>
  </p>`;
}

function createFormofCardControls() {
  return `<form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
  </form>`;
}
