import React, { Component } from 'react';
import classnames from 'classnames';
import format from 'date-fns/format';
import { Select } from '../common';
import LineChart from '../charts/LineChart/LineChart';
import styles from './PriceByDateSummary.scss';

function getGroupedByDatePrices(listings) {
  return listings.reduce((acc, { star_rating: starRating, availability }) => {
    acc[starRating] = acc[starRating] || [];

    const prices = Object.keys(availability).map(key => ({
      date: key,
      price: availability[key].nativePriceTotal,
    }));

    acc[starRating] = [...acc[starRating], ...prices];

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
  state = {};

  componentDidMount() {
    this.updateStateAndChart(this.props);
  }

  componentWillReceiveProps(props) {
    this.updateStateAndChart(props);
  }

  updateStateAndChart({ listings }) {
    const pricingByRating = getGroupedByDateAvgPrices(getGroupedByDatePrices(listings));

    const ratings = Object.keys(pricingByRating).map(rating => ({
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
      <div className={styles.root}>
        <div className={styles.col}>
          <LineChart
            label="Price per month"
            labels={labels}
            data={dataset}
          />
        </div>
        <div className={classnames([styles.col, styles.info])}>
          <div className={styles.colTitle}>
            Rental price change over time:
          </div>
          {ratings && (
            <div className={styles.selectContainer}>
              <Select
                vertical
                label="Change rating:"
                customStyles={styles.select}
                onChange={e => this.setState({ selectedRating: e.target.value })}
                value={selectedRating}
              >
                {ratings.map(({ label, value }) => (
                  <option key={label} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            </div>
          )}
        </div>
      </div>
    );
  }
}
