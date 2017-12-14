import Chart from 'chart.js';
import { h, Component } from 'preact';

export default class ListingsGrowthChart extends Component {
  componentDidMount() {
    const ctx = this.chartEl.getContext('2d');
    this.listingsGrowthChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Listings growth per year',
          backgroundColor: 'rgb(233, 30, 98)',
          borderColor: 'rgb(137, 193, 73)',
          data: [],
          fill: true,
        }]
      },
    });
  }

  componentWillReceiveProps({ listings }) {
    const listingsPerYear = listings.reduce((acc, { listing_start_date }) => {
      if (!listing_start_date) {
        return acc;
      }

      const year = listing_start_date.substring(0, 4);
      acc[year] = acc[year] ? (acc[year] + 1) : 1;
      return acc;
    }, {});

    const labels = Object.keys(listingsPerYear);
    const data = labels.map(label => listingsPerYear[label])

    this.listingsGrowthChart.data.labels = labels;
    this.listingsGrowthChart.data.datasets[0].data = data;
    this.listingsGrowthChart.update();
  }

  render() {
    return (
      <canvas ref={el => this.chartEl = el} />
    )
  }
}
