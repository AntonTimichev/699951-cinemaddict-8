import {createCountTemplate} from "./create-count-template";

export const createFilterTemplate = ({id, label, count = 0, isActive = false, additional = false}) => {
  const className = `"main-navigation__item 
  ${isActive ? `main-navigation__item--active` : ``} 
  ${additional ? `main-navigation__item--additional` : ``}"`;
  return `<a href="#${id}" class=${className} data-id="${id}">${label} ${count ? createCountTemplate(count) : ``}</a>`;
};
