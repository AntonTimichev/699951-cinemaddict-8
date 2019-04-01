import {ModelTask} from "./Model-movie";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response) => {
  return response.json();
};

export class API {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;

    this._load = this._load.bind(this);
  }

  static toRAW(data) {
    return {
      'id': data.id,
      'comments': data.comments,
      'filmInfo': {
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

  getMovies() {
    return this._load({url: `movies`})
      .then(toJSON)
      .then(ModelTask.parseMovies);
  }

  updateMovie(id, data) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON)
      .then(ModelTask.parseMovie);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
