import moment from "moment";

export function createTextListTemplate(data) {
  const {canvas, totalDuration, watchedCount} = data;
  const totalTimestamp = totalDuration * 60000;
  const totalHours = parseInt(moment.duration(totalTimestamp).asHours(), 10);
  const totalMinutes = moment.duration(totalTimestamp).get(`minutes`);

  return `<ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedCount} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${totalHours} <span class="statistic__item-description">h</span> ${totalMinutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${canvas.nameOfGenres[0]}</p>
      </li>
    </ul>`;
}
