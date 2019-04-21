const sortByComments = (data) => data.sort((a, b) => b.comments.length - a.comments.length);

const sortByRating = (data) => data.sort((a, b) => b.rating - a.rating);

export const createElement = (html) => {
  const container = document.createElement(`template`);
  container.innerHTML = html;
  return container.content;
};

export const getCardsDataForContainers = (data) => [data.slice(), sortByRating(data).slice(0, 2), sortByComments(data).slice(0, 2)];

export const createFragment = (elements) => {
  const fragmentElements = document.createDocumentFragment();
  elements.forEach((element) => fragmentElements.appendChild(element));
  return fragmentElements;
};

export const getElementsOfInstances = (instances) => instances.map((instance) => instance.render());
