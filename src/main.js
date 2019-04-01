import {initApp} from "./app-block/app";

const AUTHORIZATION = `Basic fk49g38f3j43f53v055k30v`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle/`;

initApp({endPoint: END_POINT, authorization: AUTHORIZATION}, document.querySelector(`main`));
