import moment from 'moment';
import {emojiOfComment} from "../enums";

export function createCommentItemTemplate(data) {
  const {emotion, comment, author, date} = data;
  const dayAgo = moment(date).fromNow();
  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">${emojiOfComment[emotion]}</span>
    <div>
      <p class="film-details__comment-text">${comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${dayAgo}</span>
      </p>
    </div>
  </li>`;
}
