import {initApp} from "./app-block/app";

const AUTHORIZATION = `Basic fkj3j3vk385g34gdd3f3fvm39k30v`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle/`;
const MOVIE_STORE_KEY = `movie-store-key`;

initApp({endPoint: END_POINT, authorization: AUTHORIZATION}, MOVIE_STORE_KEY, document.querySelector(`.App`));
