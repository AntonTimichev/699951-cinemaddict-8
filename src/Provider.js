import {ModelMovie} from "./Model-movie";

const objectToArray = (object) => {
  return Object.keys(object).map((id) => object[id]);
};

export class Provider {
  constructor({api, store}) {
    this._api = api;
    this._store = store;
    this._needSync = false;
  }

  updateMovie(id, data) {
    const adaptedData = this.toRAW(data);
    if (this._isOnline()) {
      return this._api.updateMovie(id, adaptedData)
        .then((movie) => {
          this._store.setItem({key: movie.id, item: adaptedData});
          return movie;
        });
    } else {
      this._needSync = true;
      this._store.setItem({key: adaptedData.id, item: adaptedData});
      return Promise.resolve(ModelMovie.parseMovie(adaptedData));
    }
  }

  getMovies() {
    if (this._isOnline()) {
      return this._api.getMovies()
        .then((movies) => {
          movies.map((movie) => this._store.setItem({key: movie.id, item: this.toRAW(movie)}));
          return movies;
        });
    } else {
      const rawMoviesMap = this._store.getAll();
      const rawMovies = objectToArray(rawMoviesMap);
      const movies = ModelMovie.parseMovies(rawMovies);
      return Promise.resolve(movies);
    }
  }

  syncMovies() {
    if (this._needSync) {
      this._needSync = false;
      return this._api.syncMovies(objectToArray(this._store.getAll()));
    } else {
      return Promise.resolve(this._store.getAll());
    }
  }

  toRAW(data) {
    return {
      'id': data.id,
      'comments': data.comments,
      'film_info': {
        'actors': data.actors,
        'age-rating': data.ageLimit,
        'alternative_title': data.originTitle,
        'description': data.description,
        'director': data.director,
        'genres': data.info.genres,
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
        'watchlist': data.watchlist
      }
    };
  }

  _isOnline() {
    return window.navigator.onLine;
  }
}
