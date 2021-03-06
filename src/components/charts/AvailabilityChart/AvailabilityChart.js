import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';

const chartElRef = createRef();

export default class AvailabilityByPriceChart extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const ctx = chartElRef.current.getContext('2d');
    this.ratingsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: this.props.label,
          backgroundColor: 'rgb(253, 86, 34)',
          data: [],
        }],
      },
      options: {
        responsive: true,
        title: {
          display: false,
        },
      },
    });

    this.drawChart(this.props);
  }

  componentWillReceiveProps(props) {
    this.drawChart(props);
  }

  drawChart({ data, labels }) {
    this.ratingsChart.data.labels = labels;
    this.ratingsChart.data.datasets[0].data = data;
    this.ratingsChart.update();
  }

  render() {
    return (
      <canvas ref={chartElRef} />
    );
  }
}

