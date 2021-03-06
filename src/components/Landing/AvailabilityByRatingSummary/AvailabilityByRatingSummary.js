import React, { Component } from 'react';
import classnames from 'classnames';
import format from 'date-fns/format';
import { AvailabilityChart } from '../../charts';
import { Select } from '../../common';
import styles from './AvailabilityByRatingSummary.scss';

function extractAvailabilityData({ star_rating: StarRating, availability }) {
  return Object.keys(availability).reduce((acc, key) => {
    const { availabilities } = availability[key];

    const availabilitiesPerMonth = availabilities.reduce((acc, { available }) => {
      acc = [...acc, available];
      return acc;
    }, []);

    const occupiedTimesPerMonth = availabilitiesPerMonth.filter(available => !available).length;

    const occupancyAndRating = {
      occupancyPercentage: (occupiedTimesPerMonth * 100) / availabilitiesPerMonth.length,
      rating: StarRating,
    };

    acc[key] = occupancyAndRating;
    return acc;
  }, {});
}

function putSameDateAvailabilitiesInGroups(acc, availability) {
  Object.keys(availability).forEach((key) => {
    acc[key] = acc[key] ? [...acc[key], availability[key]] : [availability[key]];
  });

  return acc;
}

function getCombinedDataByRating(availabilities) {
  const combinedAvailabilities = availabilities.reduce((acc, { occupancyPercentage, rating }) => {
    acc[rating] = acc[rating] ? [...acc[rating], occupancyPercentage] : [occupancyPercentage];
    return acc;
  }, {});

  return Object.keys(combinedAvailabilities).map((key) => {
    const combinedPercentage = combinedAvailabilities[key];

    return {
      rating: key === 'null' ? null : Number(key),
      occupancyPercentage: combinedPercentage.reduce((acc, curr) => acc + curr) / combinedPercentage.length,
    };
  });
}

export default class AvailabilityByRatingSummary extends Component {
  state = {};

  componentDidMount() {
    this.updateStateAndChart(this.props);
  }

  componentWillReceiveProps(props) {
    this.updateStateAndChart(props);
  }

  getChartData() {
    const { groupedAvailabilities, selectedDate } = this.state;
    let availabilities = groupedAvailabilities ? groupedAvailabilities[selectedDate] : [];
    availabilities = getCombinedDataByRating(availabilities);

    if (availabilities.length) {
      availabilities = availabilities.sort((a, b) => Number(a.rating) - Number(b.rating));
    }

    return {
      labels: availabilities.map(({ rating }) => (!rating || rating === 'null' ? 'Unrated' : `${rating} stars`)),
      data: availabilities.map(({ occupancyPercentage }) => occupancyPercentage),
    };
  }

  updateStateAndChart({ listings }) {
    const groupedAvailabilities = listings
      .map(extractAvailabilityData)
      .reduce(putSameDateAvailabilitiesInGroups, {});

    const availableDates = Object.keys(groupedAvailabilities)
      .map(date => ({
        label: date.replace(/-/, ' '),
        value: date,
      }))
      .sort((a, b) => format(a.value, 'YYYY-MM-DD') > format(b.value, 'YYYY-MM-DD'));

    this.setState({
      availableDates,
      selectedDate: availableDates[0].value,
      groupedAvailabilities,
    });
  }

  render() {
    const { availableDates, selectedDate } = this.state;
    const { labels, data } = this.getChartData();

    return (
      <div className={styles.root}>
        <div className={styles.col}>
          <AvailabilityChart label="Occupancy by rating" labels={labels} data={data} />
        </div>
        <div className={classnames([styles.col, styles.info])}>
          <div className={styles.colTitle}>
            Property occupancy percentage depending on rating:
          </div>
          {availableDates && (
            <div className={styles.selectContainer}>
              <Select
                customStyles={styles.select}
                onChange={e => this.setState({ selectedDate: e.target.value })}
                value={selectedDate}
              >
                {availableDates.map(({ label, value }) => (
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
