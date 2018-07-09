import React, { PureComponent } from 'react';
import { CHART_COLORS, getHumanizedRatingLabels } from '../utils';
import BarChart from '../BarChart/BarChart';

export default class RatingPieChart extends PureComponent {
  state = {};

  componentDidMount() {
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

    const ratingKeys = Object.keys(ratings).sort();
    const dataset = ratingKeys.map(key => ratings[key]);
    const backgroundColor = CHART_COLORS.slice(0, ratingKeys.length);
    const labels = getHumanizedRatingLabels(ratingKeys);

    this.setState({
      labels,
      dataset,
      backgroundColor,
    });
  }

  render() {
    const { labels = [], dataset = [], backgroundColor = [] } = this.state;

    return (
      <BarChart
        type="doughnut"
        label="Ratings distribution:"
        labels={labels}
        data={dataset}
        backgroundColor={backgroundColor}
      />
    );
  }
}
