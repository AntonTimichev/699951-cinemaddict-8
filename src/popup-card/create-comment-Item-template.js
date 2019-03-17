export function createCommentItemTemplate(data) {
  const {emoji, text, author, day} = data;
  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">${emoji}</span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${day} days ago</span>
      </p>
    </div>
  </li>`;
}
