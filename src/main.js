import createFilterElement from './filters/create-filter';
import createCardElement from './cards/create-card';

const filtersContainer = document.querySelector(`.main-navigation`);
const filmsMainContainer = document.querySelector(`.films-list .films-list__container`);
const filmsTopContainer = document.querySelector(`.films-list--extra:nth-last-child(2) .films-list__container`);
const filmsCommentedContainer = document.querySelector(`.films-list--extra:last-child .films-list__container`);
const filtersData = [
  {
    id: `all`,
    text: `All movies`,
    active: true
  },
  {
    id: `watchlist`,
    text: `Watchlist`,
    count: 13
  },
  {
    id: `history`,
    text: `History`,
    count: 4
  },
  {
    id: `favorites`,
    text: `Favorites`,
    count: 8
  },
  {
    id: `stats`,
    text: `Stats`,
    additional: true
  },
];

const filmsData = [
  {
    title: `The Assassination Of Jessie James By The Coward Robert Ford`,
    rating: `9.8`,
    info: {
      year: `2018`,
      duration: `1h 13m`,
      genre: `Comedy`
    },
    src: `./images/posters/three-friends.jpg`,
    description: `A priest with a haunted past and a novice on the threshold of her final vows are sent by the Vatican to investigate the death of a young nun in Romania and confront a malevolent force in the form of a demonic nun.`,
    comments: `13 comments`,
    controls: true
  },
  {
    title: `Incredibles 2`,
    rating: `9.8`,
    info: {
      year: `2018`,
      duration: `1h 13m`,
      genre: `Comedy`
    },
    src: `./images/posters/moonrise.jpg`,
    description: `A priests Romania and confront a malevolent force in the form of a demonic nun.`,
    comments: `13 comments`,
    controls: true
  },
  {
    box: `top`,
    title: `Incredibles 2`,
    rating: `9.8`,
    info: {
      year: `2018`,
      duration: `1h 13m`,
      genre: `Comedy`
    },
    src: `./images/posters/fuga-da-new-york.jpg`,
    comments: `13 comments`
  },
  {
    box: `top`,
    title: `Incredibles 2`,
    rating: `9.8`,
    info: {
      year: `2018`,
      duration: `1h 13m`,
      genre: `Comedy`
    },
    src: `./images/posters/blue-blazes.jpg`,
    comments: `13 comments`
  },
  {
    box: `commented`,
    title: `Incredibles 2`,
    rating: `9.8`,
    info: {
      year: `2018`,
      duration: `1h 13m`,
      genre: `Comedy`
    },
    src: `./images/posters/accused.jpg`,
    comments: `13 comments`
  },
  {
    box: `commented`,
    title: `Incredibles 2`,
    rating: `9.8`,
    info: {
      year: `2018`,
      duration: `1h 13m`,
      genre: `Comedy`
    },
    src: `./images/posters/blackmail.jpg`,
    comments: `13 comments`
  }
];
const filters = getFilters(filtersData);
const cards = getCards(filmsData);

renderFilters(filters);
renderCards(cards);

function getFilters(data) {
  const filtersFragment = document.createDocumentFragment();
  data.forEach((settings) => filtersFragment.appendChild(createFilterElement(settings)));
  return filtersFragment;
}

function getCards(data) {
  const cardsMainFragment = document.createDocumentFragment();
  const cardsTopFragment = document.createDocumentFragment();
  const cardsCommentedFragment = document.createDocumentFragment();
  data.forEach((settings) => {
    const {box = `main`, ...other} = settings;
    switch (box) {
      case `main`: cardsMainFragment.appendChild(createCardElement(other));
        break;
      case `top`: cardsTopFragment.appendChild(createCardElement(other));
        break;
      case `commented`: cardsCommentedFragment.appendChild(createCardElement(other));
        break;
      default: break;
    }
  });
  return {
    main: cardsMainFragment,
    top: cardsTopFragment,
    commented: cardsCommentedFragment
  };
}

function renderFilters(elements) {
  filtersContainer.innerHTML = ``;
  filtersContainer.appendChild(elements);
}

function renderCards(elements) {
  const {main, top, commented} = elements;
  filmsMainContainer.innerHTML = ``;
  filmsTopContainer.innerHTML = ``;
  filmsCommentedContainer.innerHTML = ``;
  filmsMainContainer.appendChild(main);
  filmsTopContainer.appendChild(top);
  filmsCommentedContainer.appendChild(commented);
}


