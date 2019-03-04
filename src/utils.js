function sortByComments(data) {
  return data.sort((a, b) => {
    return b.comments - a.comments;
  });
}

function sortByRating(data) {
  return data.sort((a, b) => {
    return b.rating - a.rating;
  });
}

export function getRandomArbitary(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
}

export function getRandomElements(array, amount = 1) {
  if (amount > array.length) {
    return array;
  }
  let copyArr = array.slice();
  return Array.from({length: amount}, () => copyArr.splice(getRandomInteger(0, copyArr.length - 1), 1)[0]);
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

export function getCardsDataForContainers(data) {
  return {
    main: data.slice(),
    top: sortByRating(data).slice(0, 2),
    commented: sortByComments(data).slice(0, 2)
  };
}

export function createFragment(data, create) {
  const fragmentElements = document.createDocumentFragment();
  data.forEach((cardInfo) => fragmentElements.appendChild(create(cardInfo)));
  return fragmentElements;
}
