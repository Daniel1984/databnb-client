import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';

const chartElRef = createRef();

export default class BarChart extends PureComponent {
  static propTypes = {
    type: PropTypes.string,
  };

  static defaultProps = {
    type: 'bar',
  };

  componentDidMount() {
    const { type } = this.props;
    const ctx = chartElRef.current.getContext('2d');

    this.barChart = new Chart(ctx, {
      type,
      data: {
        labels: [],
        datasets: [{
          label: '',
          data: [],
          backgroundColor: [],
        }],
      },
    });

    this.drawChart(this.props);
  }

  componentWillReceiveProps(props) {
    this.drawChart(props);
  }

  drawChart({
    labels,
    data,
    label,
    backgroundColor = '',
  }) {
    this.barChart.data.labels = labels;
    this.barChart.data.datasets[0].data = data;
    this.barChart.data.datasets[0].label = label;
    this.barChart.data.datasets[0].backgroundColor = backgroundColor;
    this.barChart.update();
  }

  render() {
    return (
      <canvas ref={chartElRef} />
    );
  }
}
