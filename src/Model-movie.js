export class ModelMovie {
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
    this.watchingDate = data[`user_details`][`watching_date`] || 0;
  }

  static parseToCard(data) {
    return new ModelMovie(data);
  }

  static parseToCards(data) {
    return data.map(ModelMovie.parseToCard);
  }

  static parseToServer(data) {
    return {
      'id': data.id,
      'comments': data.comments,
      'film_info': {
        'actors': data.actors,
        'age-rating': data.ageLimit,
        'alternative_title': data.originTitle,
        'description': data.description,
        'director': data.director,
        'genre': data.info.genres,
        'poster': data.src,
        'release': {
          'date': data.info.releaseTime,
          'release_country': data.country
        },
        'runtime': data.info.duration,
        'title': data.title,
        'total_rating': data.rating,
        'writers': data.writers
      },
      'user_details': {
        'already_watched': data.watched,
        'favorite': data.favorite,
        'personal_rating': data.rate,
        'watchlist': data.watchlist,
        'watching_date': data.watchingDate
      }
    };
  }
}

