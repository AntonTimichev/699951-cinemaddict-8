export function createControlsTemplate(control) {
  const [property, value] = control;
  return `<input type="checkbox" class="film-details__control-input visually-hidden" id="${property}" name="${property}" ${value ? `checked` : ``}>
    <label for="${property}" class="film-details__control-label film-details__control-label--${property}">Add to ${property}</label>`;
}
