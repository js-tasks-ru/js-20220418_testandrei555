export default class ColumnChart {
   constructor(chartData) {
      this.chartData = chartData;
      this.chartHeight = 50;
      this.columnChart();
   }

   update(newData) {
      const columnChartChart = this.element.querySelector(".column-chart__chart");
      columnChartChart.innerHTML = ``;

      if (Array.isArray(newData) && newData.length) {
         const maxValue = Math.max(...newData);
         const scale = 50 / maxValue;

         for (const item of newData) {
            const value = String(Math.floor(item * scale));
            const dataTooltip = (item / maxValue * 100).toFixed(0) + "%";

            columnChartChart.insertAdjacentHTML("beforeend", `<div style="--value: ${value}" data-tooltip="${dataTooltip}"></div>`);
         }
      } else {
         return this.element.classList.add("column-chart_loading");
      }
   }

   remove() {
      return this.element.remove();
   }

   destroy() {

   }

   columnChart() {
      const div = document.createElement("div");
      div.innerHTML = `
         <div class="column-chart" style="--chart-height: ${this.chartHeight}">
            <div class="column-chart__title"></div>
            <div class="column-chart__container">
               <div data-element="header" class="column-chart__header"></div>
               <div data-element="body" class="column-chart__chart"></div>
            </div>
         </div>
      `;
      this.element = div.firstElementChild;

      if (this.chartData) {
         return this.columnChartAdd();
      } else {
         return this.element.classList.add("column-chart_loading");
      }
   }

   columnChartAdd() {
      const columnChartTitle = this.element.querySelector(".column-chart__title");
      const columnChartHeader = this.element.querySelector(".column-chart__header");

      columnChartTitle.innerHTML = `Total ${this.chartData.label}`;
      columnChartHeader.innerHTML = `${this.chartData.value}`;

      if (this.chartData.link) {
         columnChartTitle.insertAdjacentHTML("beforeend", `<a href="${this.chartData.link}" class="column-chart__link">View all</a>`);
      }

      if (this.chartData.formatHeading) {
         const valueSales = this.chartData.value.toLocaleString("en");
         columnChartHeader.innerHTML = `${this.chartData.formatHeading(valueSales)}`;
      }

      return this.update(this.chartData.data);
   }
}
