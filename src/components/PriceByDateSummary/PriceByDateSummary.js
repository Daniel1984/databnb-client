import { h, Component } from 'preact';
import classnames from 'classnames';
import format from 'date-fns/format';
import styles from './PriceByDateSummary.scss';
import { Select } from '../common';
import LineChart from '../charts/LineChart/LineChart';

function getGroupedByDatePrices(listings) {
  return listings.reduce((acc, { star_rating, availability }) => {
    acc[star_rating] = acc[star_rating] || [];

    const prices = Object.keys(availability).map((key) => ({
      date: key,
      price: availability[key].nativePriceTotal,
    }));

    acc[star_rating] = [...acc[star_rating], ...prices];

    return acc;
  }, {});
}

function getGroupedByDateAvgPrices(prices) {
  return Object.keys(prices).reduce((acc, key) => {
    const summedPrices = prices[key].reduce((acc, { date, price }) => {
      acc[date] = acc[date] ? [...acc[date], price] : [price];
      return acc;
    }, {});

    acc[key] = summedPrices;
    return acc;
  }, {});
}

function getLabelsAndDataset(pricing) {
  return Object.keys(pricing).reduce((acc, key) => {
    acc[key] = pricing[key].reduce((a, b) => a + b) / pricing[key].length;
    return acc;
  }, {});
}

export default class PriceByDateSummary extends Component {
  componentDidMount() {
    this.updateStateAndChart(this.props);
  }

  componentWillReceiveProps(props) {
    this.updateStateAndChart(props);
  }

  updateStateAndChart({ listings }) {
    const pricingByRating = getGroupedByDateAvgPrices(getGroupedByDatePrices(listings));

    const ratings = Object.keys(pricingByRating).map((rating) => ({
      label: rating === 'null' ? 'Unrated' : `${rating} stars`,
      value: rating,
    }));

    this.setState({
      ratings,
      selectedRating: ratings[0].value,
      pricingByRating,
    });
  }

  render() {
    const { ratings, selectedRating, pricingByRating } = this.state;

    let labels = [];
    let dataset = [];

    if (pricingByRating) {
      const labelsAndDataset = getLabelsAndDataset(pricingByRating[selectedRating]);
      const dates = Object.keys(labelsAndDataset);
      labels = dates.map(date => format(date, 'MMM, YYYY'));
      dataset = dates.map(date => labelsAndDataset[date]);
    }

    return (
      <div class={styles.root}>
        <div class={styles.col}>
          <LineChart
            label="Price over time"
            labels={labels}
            data={dataset}
          />
        </div>
        <div class={classnames([styles.col, styles.info])}>
          <div class={styles.colTitle}>
            Property price change over time:
          </div>
          {ratings && (
            <div class={styles.selectContainer}>
              <div class={styles.selectLabel}>
                Change rating:
              </div>
              <Select
                customStyles={styles.select}
                onChange={e => this.setState({ selectedRating: e.target.value })}
                value={selectedRating}
              >
                {ratings.map(({ label, value }) => <option value={value}>{label}</option>)}
              </Select>
            </div>
          )}
        </div>
      </div>
    );
  }
}
