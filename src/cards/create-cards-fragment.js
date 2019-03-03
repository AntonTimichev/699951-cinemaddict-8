import {createCardTemplate} from './create-template';
import {createElement, getRandomInteger, getRandomElements} from "../utils";
import {descElements} from "../mok-data";

export function prepareDataForTemplate(data) {
  const {
    title = ``,
    originTitle = ``,
    actors = [],
    seasons = {},
    ageLimit = `16+`,
    premiere = `2019`,
    releaseDate = ``,
    averageRating = ``,
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
    description = getRandomElements(descElements, getRandomInteger(1, 3)).join(` `),
    comments = getRandomInteger(5, 20),
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
    averageRating,
    country,
    marks,
    description,
    comments,
    controls,
    ...settings
  };
}

export function createCardElement(card) {
  const template = createCardTemplate(card);
  return createElement(template);
}
