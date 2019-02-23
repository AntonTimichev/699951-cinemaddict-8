import createTemplate from './create-template';

function createFilterElement(filter) {
  const template = createTemplate(filter);
  return createElement(template);
}

function createElement(html) {
  const container = document.createElement(`template`);
  container.innerHTML = html;
  return container.content;
}

export default createFilterElement;
