import ModelMovie from "./model-movie";

const objectToArray = (object) => {
  return Object.keys(object).map((id) => object[id]);
};

export default class Provider {
  constructor({api, store}) {
    this._api = api;
    this._store = store;
  }

  updateMovie(id, data) {
    const adaptedData = ModelMovie.parseToServer(data);
    if (this._isOnline()) {
      return this._api.updateMovie(id, adaptedData)
        .then((movie) => {
          this._store.setItem({key: movie.id, item: adaptedData});
          return movie;
        });
    } else {
      this._store.needSync = true;
      this._store.setItem({key: adaptedData.id, item: adaptedData});
      return Promise.resolve(ModelMovie.parseToCard(adaptedData));
    }
  }

  getMovies() {
    if (this._isOnline()) {
      return this._api.getMovies()
        .then((movies) => {
          movies.forEach((movie) => this._store.setItem({key: movie.id, item: ModelMovie.parseToServer(movie)}));
          return movies;
        });
    } else {
      const rawMoviesMap = this._store.getAll();
      const rawMovies = objectToArray(rawMoviesMap);
      const movies = ModelMovie.parseToCards(rawMovies);
      return Promise.resolve(movies);
    }
  }

  syncMovies() {
    if (this._store.needSync) {
      this._store.needSync = false;
      return this._api.syncMovies(objectToArray(this._store.getAll()));
    }
    return Promise.resolve(this._store.getAll());
  }

  getAllData() {
    return Object.values(this._store.getAll()).map((item) => {
      return ModelMovie.parseToCard(item);
    });
  }

  _isOnline() {
    return window.navigator.onLine;
  }
}
