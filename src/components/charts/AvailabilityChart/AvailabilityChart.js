import Chart from 'chart.js';
import format from 'date-fns/format'
import { h, Component } from 'preact';

export default class AvailabilityByPriceChart extends Component {
  componentDidMount() {
    const ctx = this.chartEl.getContext('2d');
    this.ratingsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: this.props.label,
          backgroundColor: 'rgb(253, 86, 34)',
          data: []
        }]
      },
      options: {
        responsive: true,
        title: {
          display: false,
        }
      }
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
      <canvas ref={el => this.chartEl = el} />
    )
  }
}

