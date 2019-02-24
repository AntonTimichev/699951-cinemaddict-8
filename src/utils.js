export function createElement(html) {
  const container = document.createElement(`template`);
  container.innerHTML = html;
  return container.content;
}

export function capitalizeFirstLetter(id) {
  return `${id[0].toUpperCase()}${id.slice(1)}`;
}
