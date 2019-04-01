import {createInnerStatisticTemplate} from "./create-inner-statistictemplate";

export function createStatisticTemplate(data) {
  return `<section class="statistic visually-hidden">
    ${createInnerStatisticTemplate(data)}
  </section>`;
}
