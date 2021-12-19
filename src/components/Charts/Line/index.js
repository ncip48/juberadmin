import React, { Component } from "react";
import Chart from "chart.js";

import CardBasic from "../../Cards/Basic";

Chart.defaults.global.defaultFontFamily = "Nunito";
Chart.defaults.global.defaultFontColor = "#858796";

class ChartLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      label: this.props.label,
      data: this.props.data,
    };
  }
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    console.log(this.chartRef);

    new Chart(myChartRef, {
      type: "line",
      data: {
        labels: this.state.label,
        datasets: [
          {
            label: "Penjualan",
            lineTension: 0.3,
            backgroundColor: "rgba(231, 74, 59, 0.05)",
            borderColor: "#e74a3b",
            pointRadius: 3,
            pointBackgroundColor: "#e74a3b",
            pointBorderColor: "#e74a3b",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "#e74a3b",
            pointHoverBorderColor: "#e74a3b",
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: this.state.data,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0,
          },
        },
        scales: {
          xAxes: [
            {
              time: {
                unit: "date",
              },
              gridLines: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                maxTicksLimit: 12,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                maxTicksLimit: 10,
                padding: 10,
                callback: function (value, index, values) {
                  return value.toLocaleString("en-US", {
                    style: "currency",
                    currency: "IDR",
                  });
                },
              },
              gridLines: {
                color: "rgb(234, 236, 244)",
                zeroLineColor: "rgb(234, 236, 244)",
                drawBorder: false,
                borderDash: [2],
                zeroLineBorderDash: [2],
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          titleMarginBottom: 10,
          titleFontColor: "#6e707e",
          titleFontSize: 14,
          borderColor: "#dddfeb",
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          intersect: false,
          mode: "index",
          caretPadding: 10,
          callbacks: {
            label: function (tooltipItem, data) {
              return (
                "Rp " +
                Number(tooltipItem.yLabel)
                  .toFixed(0)
                  .replace(/./g, function (c, i, a) {
                    return i > 0 && c !== "." && (a.length - i) % 3 === 0
                      ? "." + c
                      : c;
                  })
              );
            },
          },
        },
      },
    });
  }

  render() {
    return (
      <CardBasic title={this.state.title}>
        <div className="chart-area">
          <canvas id="myAreaChart" ref={this.chartRef}></canvas>
        </div>
      </CardBasic>
    );
  }
}

export default ChartLine;
