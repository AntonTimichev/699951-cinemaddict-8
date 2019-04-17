import {Component} from "../Component";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {createStatisticTemplate} from "./create-statistic-template";
import {createElement} from "../utils";
import moment from 'moment';
import {createLabelStatisticTemplate} from "./create-label-statistic-template";
import {createTextListTemplate} from "./create-text-list-template";
import {createChartStatisticTemplate} from "./create-chart-statistic-template";

export class Statistic extends Component {
  constructor(data) {
    super(data);
    this._isChanged = null;
    this._periodName = {
      'today': `days`,
      'week': `weeks`,
      'month': `months`,
      'year': `years`
    };

    this._onTimeFilterFormChange = this._onTimeFilterFormChange.bind(this);
  }

  bind() {
    this._timeFilterForm = this._element.querySelector(`.statistic__filters`);
    this._timeFilterForm.addEventListener(`change`, this._onTimeFilterFormChange);

  }

  _getPeriodName(value) {
    return this._periodName[value];
  }

  _onTimeFilterFormChange(evt) {
    const {target} = evt;
    const filteredData = this._getDataForNewPeriod(target.value);
    this.updateDiagram(filteredData);
  }

  _getDataForNewPeriod(filterValue) {
    if (filterValue === `all-time`) {
      return this._data.slice();
    } else {
      const id = this._getPeriodName(filterValue);
      return this._data.filter((card) => {
        return !(moment().diff(card.watchingDate, id));
      });
    }
  }

  get isChanged() {
    return this._isChanged;
  }

  set isChanged(value) {
    this._isChanged = value;
  }

  _calculateStatistic(data) {
    this._statistic = {};
    let totalDuration = 0;
    let watchedCount = 0;
    data.forEach((card) => {
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

  updateDiagram(data) {
    if (this._isChanged) {
      this.update(data);
    }
    this._calculateStatistic(data);
    this._reRender();
    this._reCalcDiagram();
  }

  _reRender() {
    this._label = this._element.querySelector(`.statistic__rank`);
    this._textList = this._element.querySelector(`.statistic__text-list`);
    this._chart = this._element.querySelector(`.statistic__chart-wrap`);
    const newLabel = createElement(createLabelStatisticTemplate(this._statistic.canvas.nameOfGenres[0]));
    const newTextList = createElement(createTextListTemplate(this._statistic));
    const newChart = createElement(createChartStatisticTemplate());
    this._element.replaceChild(newLabel, this._label);
    this._element.replaceChild(newTextList, this._textList);
    this._element.replaceChild(newChart, this._chart);
    this._label = newLabel;
    this._textList = newTextList;
    this._chart = newChart;
  }

  _sortStatistic(stats) {
    const sortedStats = Object.entries(stats).sort((a, b) => {
      return b[1] - a[1];
    });
    return this._getStatsForCanvas(sortedStats);
  }

  get _template() {
    return createStatisticTemplate(this._calculateStatistic(this._data.slice()));
  }

  _reCalcDiagram() {
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
