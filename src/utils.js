function sortByComments(data) {
  return data.sort((a, b) => {
    let commentA = parseInt(a.comments, 10);
    let commentB = parseInt(b.comments, 10);
    return commentB - commentA;
  });
}

function sortByRating(data) {
  return data.sort((a, b) => {
    let ratingA = parseFloat(a.rating);
    let ratingB = parseFloat(b.rating);
    return ratingB - ratingA;
  });
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

export function sortCards(data) {
  return {
    main: data.slice(),
    top: sortByRating(data).slice(0, 2),
    commented: sortByComments(data).slice(0, 2)
  };
}

export function createFragment(data, create) {
  const fragmentElements = document.createDocumentFragment();
  data.forEach((filterInfo) => fragmentElements.appendChild(create(filterInfo)));
  return fragmentElements;
}
