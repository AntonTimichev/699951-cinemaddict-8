import createTemplate from './create-template';

function createCardElement(card) {
  const template = createTemplate(card);
  return createElement(template);
}

function createElement(html) {
  const container = document.createElement(`template`);
  container.innerHTML = html;
  return container.content;
}

export default createCardElement;
