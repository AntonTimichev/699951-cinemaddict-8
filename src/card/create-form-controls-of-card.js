export function createFormControlsOfCard(watchlist, watched, favorite) {
  return `<form class="film-card__controls">
    <button 
      class="film-card__controls-item button 
      film-card__controls-item--add-to-watchlist 
      ${watchlist ? `film-card__controls-item--active` : ``}"
    >
      Add to watchlist
    </button>
    <button 
      class="film-card__controls-item button 
      film-card__controls-item--mark-as-watched
      ${watched ? `film-card__controls-item--active` : ``}"
    >
      Mark as watched
    </button>
    <button 
        class="film-card__controls-item button 
        film-card__controls-item--favorite
        ${favorite ? `film-card__controls-item--active` : ``}"
      >
      Mark as favorite
    </button>
  </form>`;
}
