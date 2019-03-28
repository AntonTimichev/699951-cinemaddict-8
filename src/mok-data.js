import {getRandomElements, getRandomInteger, getRandomArbitary, getRandomLengthArray, sortByTimeComment} from "./utils";

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
  `Intouchables`,
  `Inception`,
  `Knockin' on Heaven's Door`,
  `A Beautiful Mind`,
  `Back to the Future`,
  `Shutter Island`,
  `Saving Private Ryan`,
  `Live Another Day`,
  `The Assassination Of Jessie James By The Coward Robert Ford`,
  `Incredibles 2`
];

const genres = [
  `Detective`,
  `Comedy`,
  `Drama`,
  `Criminal`,
  `Triller`,
  `Amine`,
  `Action`
];

const images = [
  `./images/posters/moonrise.jpg`,
  `./images/posters/three-friends.jpg`,
  `./images/posters/moonrise.jpg`,
  `./images/posters/fuga-da-new-york.jpg`,
  `./images/posters/blue-blazes.jpg`,
  `./images/posters/accused.jpg`,
  `./images/posters/blackmail.jpg`
];

const actors = [
  `Tom Hanks`,
  `Christian Bale`,
  `Morgan Freeman`,
  `Leonardo DiCaprio`,
  `Robert De Niro`,
  `Robert Downey Jr.`,
  `Gary Oldman`,
  `Edward Norton`,
  `Liam Neeson`,
  `Matt Damon`,
  `Hugh Jackman`
];

const comments = [
  `So long-long story, boring!`,
  `good`,
  `bad`,
  `norm`,
  `shit`,
  `fine`,
  `any`,
  `soo`,
  `very bad`,
  `very good`,
  `beautiful`,
  `amazing`,
  `like`,
  `no look`,
  `no smile`,
  `funny`,
  `recommended`,
  `my favorite`,
  `what is that?`
];

function createCommentInfo() {
  return {
    emoji: `😐`,
    text: getRandomElements(comments, 1)[0],
    author: `Mark Dacascas`,
    day: Date.now() - (1000 * 60 * getRandomInteger(1, 60))
  };
}

function createFilmCard() {
  const year = Date.now() - ((1000 * 60 * 60 * getRandomInteger(1, 24) * 366) * getRandomInteger(1, 10));
  const duration = (1000 * 60 * getRandomInteger(80, 100));
  return {
    id: Math.random().toString().slice(2, 7),
    title: getRandomElements(titles, 1)[0],
    rating: getRandomArbitary(6, 10),
    info: {
      yearTime: year,
      duration,
      genre: getRandomElements(genres, 1)[0],
    },
    description: getRandomElements(descElements, getRandomInteger(1, 3)).join(` `),
    ageLimit: getRandomInteger(12, 18),
    src: getRandomElements(images, 1)[0],
    comments: sortByTimeComment(getRandomLengthArray(createCommentInfo, getRandomInteger(1, comments.length))),
    actors: getRandomElements(actors, getRandomInteger(1, 3)).join(` `),
    watchlist: false,
    watched: true,
    favorite: false,
    releaseTime: year + (1000 * 60 * 60 * getRandomInteger(1, 24) * 366),
    country: `USA`,
    rate: 0
  };
}

export const filmsData = getRandomLengthArray(createFilmCard, 12);
