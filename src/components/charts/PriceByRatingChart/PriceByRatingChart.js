import { h, Component } from 'preact';
import { CHART_COLORS, getBarChartBlueprint } from '../utils';

export default class PriceByRatingChart extends Component {
  componentDidMount() {
    const ctx = this.chartEl.getContext('2d');
    this.priceByRatingsChart = getBarChartBlueprint({ label: 'Monthly rental price:', ctx });
  }

  componentWillReceiveProps({ listings }) {
    const pricesByRating = listings.reduce((acc, { star_rating, availability }) => {
      const availabilityKeys = Object.keys(availability);

      const totalPrice = availabilityKeys.reduce((acc, currentKey) => {
        const { nativeAdjustedPriceTotal, nativePriceTotal } = availability[currentKey];
        acc = acc + (nativeAdjustedPriceTotal || nativePriceTotal);
        return acc;
      }, 0);

      const avgPrice = Math.ceil(totalPrice / availabilityKeys.length);
      acc[star_rating] = acc[star_rating] ? [...acc[star_rating], avgPrice] : [avgPrice];
      return acc;
    }, {});

    const ratingKeys = Object.keys(pricesByRating).sort();
    const backgroundColor = CHART_COLORS.slice(0, ratingKeys.length);

    const data = ratingKeys.map((key) => {
      const prices = pricesByRating[key];
      const sumOfPrices = prices.reduce((accumulator, currentValue) => accumulator + currentValue);

      return Math.ceil(sumOfPrices / prices.length);
    });

    const labels = ratingKeys.map((key) => {
      if (key === 'null') {
        return 'Unrated';
      } else if (key === '1') {
        return `${key} Star`;
      }

      return `${key} Stars`;
    });

    this.priceByRatingsChart.data.labels = labels;
    this.priceByRatingsChart.data.datasets[0].data = data;
    this.priceByRatingsChart.data.datasets[0].backgroundColor = backgroundColor;
    this.priceByRatingsChart.update();
  }

  render() {
    return (
      <canvas ref={el => this.chartEl = el} />
    )
  }
}
