export function createRatingTemplate(rate, index) {
  return `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${index}" id="rating-${index}" ${rate === index ? `checked` : ``}>
    <label class="film-details__user-rating-label" for="rating-${index}">${index}</label>`;
}
