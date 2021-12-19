import React, { Component } from "react";
import Chart from "chart.js";

import CardBasic from "../../Cards/Basic";

class ChartDonut extends Component {
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
    const myPieChart = this.chartRef.current.getContext("2d");
    console.log(this.chartRef);

    new Chart(myPieChart, {
      type: "doughnut",
      data: {
        labels: this.state.label,
        datasets: [
          {
            data: this.state.data,
            backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc"],
            hoverBackgroundColor: ["#2e59d9", "#17a673", "#2c9faf"],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: "#dddfeb",
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
          callbacks: {
            label: function (tooltipItem, data) {
              var label = data.labels[tooltipItem.index];
              var val =
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              return (
                label +
                " : " +
                "Rp " +
                Number(val)
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
        legend: {
          display: false,
        },
        cutoutPercentage: 0,
      },
    });
  }

  render() {
    return (
      <CardBasic title={this.state.title}>
        <div className="chart-pie pt-4">
          <canvas id="myPieChart" ref={this.chartRef}></canvas>
        </div>
        <div className="mt-4 text-center small">
          <span className="mr-2">
            <i className="fas fa-circle text-primary"></i> Direct
          </span>
          <span className="mr-2">
            <i className="fas fa-circle text-success"></i> Social
          </span>
          <span className="mr-2">
            <i className="fas fa-circle text-info"></i> Referral
          </span>
        </div>
      </CardBasic>
    );
  }
}

export default ChartDonut;
