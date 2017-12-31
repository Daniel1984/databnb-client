import Chart from 'chart.js';
import { h, Component } from 'preact';

export default class BarChart extends Component {
  componentDidMount() {
    const { type = 'bar' } = this.props;
    const ctx = this.chartEl.getContext('2d');

    this.barChart = new Chart(ctx, {
      type,
      data: {
        labels: [],
        datasets: [{
          label: '',
          data: [],
          backgroundColor: [],
        }]
      }
    });

    this.drawChart(this.props);
  }

  componentWillReceiveProps(props) {
    this.drawChart(props);
  }

  drawChart({ labels, data, label, backgroundColor }) {
    this.barChart.data.labels = labels;
    this.barChart.data.datasets[0].data = data;
    this.barChart.data.datasets[0].label = label;
    backgroundColor && (this.barChart.data.datasets[0].backgroundColor = backgroundColor);
    this.barChart.update();
  }

  render() {
    return (
      <canvas ref={el => this.chartEl = el} />
    )
  }
}
