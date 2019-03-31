export class ModelTask {
  constructor(data) {
    this.id = data[`id`];
    this.title = data[`film_info`][`title`] || ``;
    this.originTitle = data[`film_info`][`alternative_title`] || ``;
    this.rating = data[`film_info`][`total_rating`] || ``;
    this.info = {
      releaseTime: data[`film_info`][`release`][`date`] || ``,
      duration: data[`film_info`][`runtime`],
      genres: data[`film_info`][`genre`] || [],
    };
    this.description = data[`film_info`][`description`] || ``;
    this.director = data[`film_info`][`director`] || ``;
    this.writers = data[`film_info`][`writers`] || [];
    this.ageLimit = data[`film_info`][`age_rating`] || ``;
    this.src = data[`film_info`][`poster`] || ``;
    this.comments = data[`comments`];
    this.actors = data[`film_info`][`actors`] || ``;
    this.watchlist = data[`user_details`][`watchlist`];
    this.watched = data[`user_details`][`already_watched`];
    this.favorite = data[`user_details`][`favorite`];
    this.country = data[`film_info`][`release`][`release_country`] || ``;
    this.rate = data[`user_details`][`personal_rating`] || 0;
  }

  static parseMovie(data) {
    return new ModelTask(data);
  }

  static parseMovies(data) {
    return data.map(ModelTask.parseMovie);
  }
}

