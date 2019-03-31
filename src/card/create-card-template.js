import moment from 'moment';
import {createFormControlsOfCard} from "./create-form-controls-of-card";

function prepareDataForTemplate(data) {
  const {
    title = ``,
    rating = ``,
    info = {
      releaseTime: ``,
      duration: ``,
      genres: ``
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
  const {title, rating, src, description = false, comments, controls, info, watchlist, watched, favorite} = prepareDataForTemplate(data);
  return `<article class="film-card ${!controls ? `film-card--no-controls` : ``}">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    ${createCardInfo(info)}
    <img src=${src} alt="" class="film-card__poster">
    ${description ? `<p class="film-card__description">${description}</p>` : ``}
    <button class="film-card__comments">${comments.length} comments</button>
    
    ${createFormControlsOfCard(watchlist, watched, favorite)}
  </article>`;
}

function createCardInfo(infoData) {
  const {releaseTime, duration, genres} = infoData;
  const year = moment(releaseTime).format(`YYYY`);
  return `<p class="film-card__info">
    <span class="film-card__year">${year}</span>
    <span class="film-card__duration">${duration}m</span>
    <span class="film-card__genre">${genres.join(` `)}</span>
  </p>`;
}
