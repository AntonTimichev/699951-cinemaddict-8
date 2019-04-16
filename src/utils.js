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

export function getElementsOfInstances(instances) {
  return instances.map((instance) => instance.render());
}
