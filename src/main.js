import {initApp} from "./app-block/app";

const AUTHORIZATION = `Basic fkj3j3vg23g5hf3d9k30v`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle/`;
const MOVIE_STORE_KEY = `movie-store-key`;

initApp({endPoint: END_POINT, authorization: AUTHORIZATION}, MOVIE_STORE_KEY, document.querySelector(`.App`));
