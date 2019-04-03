export class Store {
  constructor({key, storage}) {
    this._storage = storage;
    this._storeKey = key;
  }

  setItem({key, item}) {
    const movies = this.getAll();
    movies[key] = item;

    this._storage.setItem(this._storeKey, JSON.stringify(movies));
  }

  getItem({key}) {
    const movies = this.getAll();
    return movies[key];
  }

  getAll() {
    const emptyItems = {};
    const movies = this._storage.getItem(this._storeKey);

    if (!movies) {
      return emptyItems;
    }

    try {
      return JSON.parse(movies);
    } catch (e) {
      return emptyItems;
    }
  }
}
