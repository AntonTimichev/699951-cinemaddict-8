import {Component} from "../Component";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {createStatisticTemplate} from "./create-statistic-template";
import {createElement} from "../utils";
import {createInnerStatisticTemplate} from "./create-inner-statistictemplate";

export class Statistic extends Component {
  constructor(data) {
    super(data);
    this._isChanged = null;
  }

  get isChanged() {
    return this._isChanged;
  }

  set isChanged(value) {
    this._isChanged = value;
  }

  _calculateStatistic() {
    this._statistic = {};
    let totalDuration = 0;
    let watchedCount = 0;
    this._data.forEach((card) => {
      const {genres, duration} = card.info;
      if (card.watched) {
        genres.forEach((genre) => {
          if (!this._statistic[genre]) {
            this._statistic[genre] = 1;
          } else {
            this._statistic[genre] += 1;
          }
        });
        totalDuration += parseInt(duration, 10);
        watchedCount += 1;
      }
    });
    this._statistic.canvas = this._sortStatistic(this._statistic);
    this._statistic.totalDuration = totalDuration;
    this._statistic.watchedCount = watchedCount;
    return this._statistic;
  }

  update(data) {
    this._data = data;
  }

  _getStatsForCanvas(data) {
    let valuesOfGenres = [];
    let nameOfGenres = [];
    data.forEach((pair) => {
      valuesOfGenres.push(pair[1]);
      nameOfGenres.push(pair[0]);
    });
    return {valuesOfGenres, nameOfGenres};
  }

  rerender() {
    this._calculateStatistic();
    const newStats = createElement(createInnerStatisticTemplate(this._statistic));
    this._element.innerHTML = ``;
    this._element.appendChild(newStats);
  }

  _sortStatistic(stats) {
    const sortedStats = Object.entries(stats).sort((a, b) => {
      return b[1] - a[1];
    });
    return this._getStatsForCanvas(sortedStats);
  }

  get template() {
    return createStatisticTemplate(this._calculateStatistic());
  }

  showDiagram() {
    const statisticCtx = this._element.querySelector(`.statistic__chart`);
    const {valuesOfGenres, nameOfGenres} = this._statistic.canvas;
    const BAR_HEIGHT = 50;
    statisticCtx.height = BAR_HEIGHT * valuesOfGenres.length;
    return new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: nameOfGenres,
        datasets: [{
          data: valuesOfGenres,
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }
}
