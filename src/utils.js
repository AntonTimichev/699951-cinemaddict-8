function sortByComments(data) {
  return data.sort((a, b) => {
    return b.comments.length - a.comments.length;
  });
}

function sortByRating(data) {
  return data.sort((a, b) => {
    return b.rating - a.rating;
  });
}

export function sortByTimeComment(data) {
  return data.sort((a, b) => {
    return a.day - b.day;
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

export function getCardsDataForContainers(data) {
  return [data.slice(), sortByRating(data).slice(0, 2), sortByComments(data).slice(0, 2)];
}

export function createFragment(elements) {
  const fragmentElements = document.createDocumentFragment();
  elements.forEach((element) => fragmentElements.appendChild(element));
  return fragmentElements;
}

export function getRandomLengthArray(fn, amount) {
  return Array.from({length: amount}, () => fn());
}

export const getElementsOfInstances = (instances) => instances.map((instance) => instance.render());
