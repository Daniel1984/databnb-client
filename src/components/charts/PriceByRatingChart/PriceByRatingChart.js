import React, { PureComponent } from 'react';
import { CHART_COLORS, getHumanizedRatingLabels } from '../utils';
import BarChart from '../BarChart/BarChart';

function getPricesGroupedByRating(acc, { star_rating, availability }) {
  const availabilityKeys = Object.keys(availability);

  const totalPrice = availabilityKeys.reduce((acc, currentKey) => {
    const { nativeAdjustedPriceTotal, nativePriceTotal } = availability[currentKey];
    acc += (nativeAdjustedPriceTotal || nativePriceTotal);
    return acc;
  }, 0);

  const avgPrice = Math.ceil(totalPrice / availabilityKeys.length);
  acc[star_rating] = acc[star_rating] ? [...acc[star_rating], avgPrice] : [avgPrice];

  return acc;
}

export default class PriceByRatingChart extends PureComponent {
  state = {};

  componentDidMount() {
    this.drawChart(this.props);
  }

  componentWillReceiveProps(props) {
    this.drawChart(props);
  }

  drawChart({ listings }) {
    const pricesByRating = listings.reduce(getPricesGroupedByRating, {});
    const ratingKeys = Object.keys(pricesByRating).sort();
    const backgroundColor = CHART_COLORS.slice(0, ratingKeys.length);

    const dataset = ratingKeys.map((key) => {
      const prices = pricesByRating[key];
      const sumOfPrices = prices.reduce((accumulator, currentValue) => accumulator + currentValue);

      return Math.ceil(sumOfPrices / prices.length);
    });

    const labels = getHumanizedRatingLabels(ratingKeys);

    this.setState({
      dataset,
      labels,
      backgroundColor,
    });
  }

  render() {
    const { labels = [], dataset = [], backgroundColor = [] } = this.state;

    return (
      <BarChart
        label="Monthly rental price:"
        labels={labels}
        data={dataset}
        backgroundColor={backgroundColor}
      />
    );
  }
}
