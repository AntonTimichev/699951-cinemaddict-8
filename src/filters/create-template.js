import {capitalizeFirstLetter} from '../utils';

export default ({id, label = capitalizeFirstLetter(id), count = 0, isActive = false, additional = false}) => {
  const className = `class="main-navigation__item 
    ${isActive ? `main-navigation__item--active` : ``} 
    ${additional ? `main-navigation__item--additional` : ``}`;
  return `<a href="${id}" ${className}>${label} ${count ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`;
};
