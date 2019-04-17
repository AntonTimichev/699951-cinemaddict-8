import moment from 'moment';
import {createFormControlsOfCard} from "./create-form-controls-of-card";
import {MSK_IN_MINUTES} from "../enums";

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
    watchlist = false,
    watched = false,
    favorite = false
  } = data;

  return {
    title,
    rating,
    info,
    src,
    description,
    comments,
    watchlist,
    watched,
    favorite
  };
}

export function createCardTemplate(data, hasControl) {
  const {title, rating, src, description = false, comments, info, watchlist, watched, favorite} = prepareDataForTemplate(data);
  return `<article class="film-card ${!hasControl ? `film-card--no-controls` : ``}">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    ${createCardInfo(info)}
    <img src=${src} alt="" class="film-card__poster">
    ${description ? `<p class="film-card__description">${description}</p>` : ``}
    <button class="film-card__comments">${comments.length} comments</button>
    
    ${hasControl ? createFormControlsOfCard(watchlist, watched, favorite) : ``}
  </article>`;
}

function createCardInfo(infoData) {
  const {releaseTime, duration, genres} = infoData;
  const durationTimestamp = duration * MSK_IN_MINUTES;
  const minutes = moment.duration(durationTimestamp).get(`minutes`);
  const runTime = `${moment.duration(durationTimestamp).get(`hours`)}:${minutes < 10 ? `0${minutes}` : minutes}`;
  const year = moment(releaseTime).format(`YYYY`);
  return `<p class="film-card__info">
    <span class="film-card__year">${year}</span>
    <span class="film-card__duration">${runTime}</span>
    <span class="film-card__genre">${genres.join(` `)}</span>
  </p>`;
}
