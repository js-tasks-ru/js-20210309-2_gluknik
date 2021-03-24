export default class ColumnChart {
  constructor(obj = {}) {
    this.data = obj.data;
    this.label = obj.label;
    this.value = obj.value;
    this.link = obj.link;
    this.render();
    this.makeChart();
    this.hasData = false;
    this.checkData();
    this.chartHeight = 50;
  }

  checkData() {
    if (this.data && this.data.length > 0) {
      this.hasData = true;
    }
  }

  makeChart(dataArr) {
    if (dataArr) {
      let chartHtml = '';
      const maxValue = Math.max(...dataArr);

      dataArr.forEach(element => {
        const tooltipValue = Math.round(element / (maxValue / 100));
        const editedValue = Math.floor(tooltipValue / 2);
        chartHtml = chartHtml.concat(`<div style="--value: ${editedValue}" data-tooltip="${tooltipValue}%"></div>`);
      });

      return chartHtml;
    }
  }

  update (dataArr) {
    const chartBody = this.element.querySelector('.column-chart__chart');
    chartBody.innerHTML = this.makeChart(dataArr);
  }

  render() {
    this.checkData();
    const element = document.createElement('div');

    element.innerHTML = `
      <div class="column-chart ${!this.hasData ? ' column-chart_loading' : ''}" style="--chart-height: 50">
        <div class="column-chart__title">
          Total ${this.label}
          ${this.link ? '<a href="/sales" class="column-chart__link">View all</a>' : ''}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">${this.value}</div>
          <div data-element="body" class="column-chart__chart">
            ${this.makeChart(this.data)}
          </div>
        </div>
      </div>
    `;

    this.element = element.firstElementChild;
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}