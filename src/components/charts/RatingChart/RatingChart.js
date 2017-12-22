import { h, Component } from 'preact';
import { CHART_COLORS, getBarChartBlueprint } from '../utils';

export default class RatingPieChart extends Component {
  componentDidMount() {
    const ctx = this.chartEl.getContext('2d');
    this.ratingsChart = getBarChartBlueprint({ label: 'Ratings distribution:', ctx });
    this.drawChart(this.props);
  }

  componentWillReceiveProps(props) {
    this.drawChart(props);
  }

  drawChart({ listings }) {
    const ratings = listings.reduce((acc, { star_rating }) => {
      acc[star_rating] = acc[star_rating] ? (acc[star_rating] + 1) : 1;
      return acc;
    }, {});

    const rankingKeys = Object.keys(ratings).sort();
    const data = rankingKeys.map(key => ratings[key]);
    const backgroundColor = CHART_COLORS.slice(0, rankingKeys.length);

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
      <canvas ref={el => this.chartEl = el} />
    )
  }
}
