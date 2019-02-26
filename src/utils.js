function prepareDataForTemplate(data) {
  const {
    box = `main`,
    title = `Incredibles 2`,
    rating = `9.8`,
    info = {
      year: `2018`,
      duration: `1h 13m`,
      genre: `Comedy`
    },
    src = `./images/posters/moonrise.jpg`,
    description = ``,
    comments = ``,
    controls = false,
    ...settings
  } = data;

  return {
    box,
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

export function getRandomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export function createElement(html) {
  const container = document.createElement(`template`);
  container.innerHTML = html;
  return container.content;
}

export function capitalizeFirstLetter(id) {
  return `${id[0].toUpperCase()}${id.slice(1)}`;
}

export function sortCards(data) {
  const sortedData = {
    main: [],
    top: [],
    commented: []
  };
  data.forEach((card) => {
    const prepareCard = prepareDataForTemplate(card);
    sortedData[`${prepareCard.box}`].push(prepareCard);
  });
  return sortedData;
}

export function createFragment(data, create) {
  const fragmentElements = document.createDocumentFragment();
  data.forEach((filterInfo) => fragmentElements.appendChild(create(filterInfo)));
  return fragmentElements;
}
