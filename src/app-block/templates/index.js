import {createHeaderTemplate} from "./create-header-template";
import {createMainTemplate} from "./create-main-template";
import {createFooterTemplate} from "./create-footer-template";

export const createAppTemplate = () => `
  ${createHeaderTemplate()}
  ${createMainTemplate()}
  ${createFooterTemplate()}`;
