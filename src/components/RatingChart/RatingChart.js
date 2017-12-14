import Chart from 'chart.js';
import { h, Component } from 'preact';

const backgroundColors = [
  'rgb(233, 30, 98)',
  'rgb(33, 149, 242)',
  'rgb(137, 193, 73)',
  'rgb(253, 86, 34)',
  'rgb(102, 58, 182)',
  'rgb(95, 124, 137)',
  'rgb(54, 63, 70)',
  'rgb(119, 84, 70)',
];

export default class RatingPieChart extends Component {
  componentDidMount() {
    const ctx = this.pieChartEl.getContext('2d');
    this.ratingsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Ratings',
          data: [],
          backgroundColor: [],
        }]
      }
    });
  }

  componentWillReceiveProps({ listings }) {
    const ratings = listings.reduce((acc, { star_rating }) => {
      acc[star_rating] = acc[star_rating] ? (acc[star_rating] + 1) : 1;
      return acc;
    }, {});

    const rankingKeys = Object.keys(ratings).sort().reverse();
    const data = rankingKeys.map(key => ratings[key]);
    const backgroundColor = backgroundColors.slice(0, rankingKeys.length);

    const labels = rankingKeys.map((key) => {
      if (key === 'null') {
        return 'Unrated';
      } else if (key === '1') {
        return `${key} Star`;
      }

      return `${key} Stars`;
    });

    this.ratingsChart.data.labels = labels;
    this.ratingsChart.data.datasets[0].data = data;
    this.ratingsChart.data.datasets[0].backgroundColor = backgroundColor;
    this.ratingsChart.update();
  }

  render() {
    return (
      <canvas ref={el => this.pieChartEl = el} />
    )
  }
}
