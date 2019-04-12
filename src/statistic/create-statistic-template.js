import {createInnerStatisticTemplate} from "./create-inner-statistic-template";

export function createStatisticTemplate(data) {
  return `<section class="statistic visually-hidden">
    ${createInnerStatisticTemplate(data)}
  </section>`;
}
