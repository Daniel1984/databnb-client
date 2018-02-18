import React, { Component } from 'react';
import Chart from 'chart.js';

export default class LineChart extends Component {
  componentDidMount() {
    const ctx = this.chartEl.getContext('2d');
    this.lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: '',
          backgroundColor: 'rgb(233, 30, 98)',
          borderColor: 'rgb(137, 193, 73)',
          data: [],
          fill: false,
        }]
      },
    });

    this.drawChart(this.props);
  }

  componentWillReceiveProps(props) {
    this.drawChart(props);
  }

  drawChart({ labels, data, label }) {
    this.lineChart.data.labels = labels;
    this.lineChart.data.datasets[0].data = data;
    this.lineChart.data.datasets[0].label = label; //`Price / Distance`;
    this.lineChart.update();
  }

  render() {
    return (
      <canvas ref={el => this.chartEl = el} />
    )
  }
}
