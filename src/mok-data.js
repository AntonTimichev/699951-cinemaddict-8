import {getRandomElements, getRandomInteger, getRandomArbitary} from "./utils";

const descElements = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus`
];

const titles = [
  `Special one`,
  `Intouchables `,
  `Inception `,
  `Knockin' on Heaven's Door`,
  `A Beautiful Mind`,
  `Back to the Future`,
  `Shutter Island`,
  `Saving Private Ryan`,
  `Live Another Day`
];

export const FilmsData = [
  {
    title: `The Assassination Of Jessie James By The Coward Robert Ford`,
    rating: getRandomArbitary(6, 10),
    info: {
      year: 2010,
      duration: `1h 13m`,
      genre: `сomedy`
    },
    src: `./images/posters/three-friends.jpg`,
    description: `A priest with a haunted past and a novice on the threshold of her final vows are sent by the Vatican to investigate the death of a young nun in Romania and confront a malevolent force in the form of a demonic nun.`,
    comments: 13
  },
  {
    title: `Incredibles 2`,
    rating: getRandomArbitary(6, 10),
    info: {
      year: 2017,
      duration: `1h 13m`,
      genre: `сomedy`
    },
    src: `./images/posters/moonrise.jpg`,
    description: `A priests Romania and confront a malevolent force in the form of a demonic nun.`,
    comments: 8
  },
  {
    title: getRandomElements(titles, 1),
    rating: getRandomArbitary(6, 10),
    seasons: {
      first: [`one`, `two`, `three`, `four`, `five`],
      second: [`oneS`, `twoS`, `threeS`, `fourS`, `fiveS`]
    },
    info: {
      year: 2012,
      duration: `50m`,
      genre: `detective`
    },
    description: getRandomElements(descElements, getRandomInteger(1, 3)).join(` `),
    ageLimit: `18+`,
    src: `./images/posters/moonrise.jpg`,
    comments: getRandomInteger(1, 20)
  },
  {
    title: getRandomElements(titles, 1),
    rating: getRandomArbitary(6, 10),
    info: {
      year: 2018,
      duration: `1h 13m`,
      genre: `Comedy`
    },
    src: `./images/posters/moonrise.jpg`,
    description: getRandomElements(descElements, getRandomInteger(1, 3)).join(` `),
    comments: getRandomInteger(1, 20)
  },
  {
    title: getRandomElements(titles, 1),
    rating: getRandomArbitary(6, 10),
    info: {
      year: 2018,
      duration: `1h 13m`,
      genre: `Comedy`
    },
    src: `./images/posters/moonrise.jpg`,
    description: getRandomElements(descElements, getRandomInteger(1, 3)).join(` `),
    comments: getRandomInteger(1, 20)
  },
  {
    title: getRandomElements(titles, 1),
    rating: getRandomArbitary(6, 10),
    info: {
      year: 2015,
      duration: `1h 13m`,
      genre: `Comedy`
    },
    src: `./images/posters/moonrise.jpg`,
    description: getRandomElements(descElements, getRandomInteger(1, 3)).join(` `),
    comments: getRandomInteger(1, 20)
  },
  {
    title: getRandomElements(titles, 1),
    rating: getRandomArbitary(6, 10),
    info: {
      year: 2013,
      duration: `1h 13m`,
      genre: `Comedy`
    },
    src: `./images/posters/moonrise.jpg`,
    description: getRandomElements(descElements, getRandomInteger(1, 3)).join(` `),
    comments: getRandomInteger(1, 20)
  },
  {
    title: getRandomElements(titles, 1),
    rating: getRandomArbitary(6, 10),
    info: {
      year: 2018,
      duration: `1h 13m`,
      genre: `Comedy`
    },
    src: `./images/posters/fuga-da-new-york.jpg`,
    description: getRandomElements(descElements, getRandomInteger(1, 3)).join(` `),
    comments: getRandomInteger(1, 20)
  },
  {
    title: getRandomElements(titles, 1),
    rating: getRandomArbitary(6, 10),
    info: {
      year: 2008,
      duration: `1h 13m`,
      genre: `Comedy`
    },
    src: `./images/posters/blue-blazes.jpg`,
    description: getRandomElements(descElements, getRandomInteger(1, 3)).join(` `),
    comments: getRandomInteger(1, 20)
  },
  {
    title: getRandomElements(titles, 1),
    rating: getRandomArbitary(6, 10),
    info: {
      year: 2018,
      duration: `1h 13m`,
      genre: `Comedy`
    },
    src: `./images/posters/accused.jpg`,
    description: getRandomElements(descElements, getRandomInteger(1, 3)).join(` `),
    comments: getRandomInteger(1, 20)
  },
  {
    title: getRandomElements(titles, 1),
    rating: getRandomArbitary(6, 10),
    info: {
      year: 2011,
      duration: `1h 13m`,
      genre: `Comedy`
    },
    src: `./images/posters/blackmail.jpg`,
    description: getRandomElements(descElements, getRandomInteger(1, 3)).join(` `),
    comments: getRandomInteger(1, 20)
  }
];
