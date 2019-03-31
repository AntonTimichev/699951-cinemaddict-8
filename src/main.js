import {initApp} from "./app-block/app";


const AUTHORIZATION = `Basic fk49g38g0j48433fk3v055k30v`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle/`;

initApp({endPoint: END_POINT, authorization: AUTHORIZATION}, document.querySelector(`main`));
