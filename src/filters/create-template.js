export default ({id, text, count = 0, active = false, additional = false}) => `
  <a 
    href="${id}" 
    class="main-navigation__item 
    ${active ? `main-navigation__item--active` : ``} 
    ${additional ? `main-navigation__item--additional` : ``}">
      ${text} 
      ${count ? `<span class="main-navigation__item-count">${count}</span>` : ``}
  </a>`;
