import {createInnerStatisticTemplate} from "./create-inner-statistic-template";

export const createStatisticTemplate = (data) => `
  <section class="statistic visually-hidden">
    ${createInnerStatisticTemplate(data)}
  </section>`;
