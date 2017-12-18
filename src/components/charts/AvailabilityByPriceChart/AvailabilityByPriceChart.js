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
          label: 'Avalability by pricing',
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
  }

  componentWillReceiveProps({ data, labels }) {
    /*
      1. add option select or tabs to switch between available Month-year
      2. only display occupancy rate for selected month not sum or avg
      3. maybe add rating filter to filer by rating too
    */

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

