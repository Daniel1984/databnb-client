import React, { Component } from 'react';
import classnames from 'classnames';
import format from 'date-fns/format'
import styles from './AvailabilityByPriceSummary.scss';
import { AvailabilityChart } from '../charts';
import { Select } from '../common';

function extractAvailabilityData({ availability }) {
  return Object.keys(availability).reduce((acc, key) => {
    const { availabilities, nativeAdjustedPriceTotal, nativePriceTotal } = availability[key];

    const availabilitiesPerMonth = availabilities.reduce((acc, { available }) => {
      acc = [...acc, available];
      return acc;
    }, []);

    const occupiedTimesPerMonth = availabilitiesPerMonth.filter(available => !available).length;

    const occupancyAndPrice = {
      occupancyPercentage: occupiedTimesPerMonth * 100 / availabilitiesPerMonth.length,
      monthlyPrice: nativeAdjustedPriceTotal || nativePriceTotal,
    };

    acc[key] = occupancyAndPrice;
    return acc;
  }, {});
};

function putSameDateAvailabilitiesInGroups(acc, availability) {
  Object.keys(availability).forEach((key) => {
    acc[key] = acc[key] ? [...acc[key], availability[key]] : [availability[key]];
  });

  return acc;
};

export default class AvailabilityByPriceSummary extends Component {
  componentDidMount() {
    this.updateStateAndChart(this.props);
  }

  componentWillReceiveProps(props) {
    this.updateStateAndChart(props);
  }

  updateStateAndChart({ listings }) {
    const groupedAvailabilities = listings
      .map(extractAvailabilityData)
      .reduce(putSameDateAvailabilitiesInGroups, {});

    const availableDates = Object.keys(groupedAvailabilities)
      .map((date) => ({
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
    const { groupedAvailabilities, availableDates, selectedDate } = this.state;
    let availabilities = groupedAvailabilities ? groupedAvailabilities[selectedDate] : [];

    if (availabilities.length) {
      availabilities = availabilities.sort((a, b) => a.monthlyPrice - b.monthlyPrice);
    }

    const labels = availabilities.map(({ monthlyPrice }) => monthlyPrice);
    const data = availabilities.map(({ occupancyPercentage }) => occupancyPercentage);

    return (
      <div className={styles.root}>
        <div className={styles.col}>
          <AvailabilityChart label="Occupancy by pricing" labels={labels} data={data} />
        </div>
        <div className={classnames([styles.col, styles.info])}>
          <div className={styles.colTitle}>
            Property occupancy percentage depending on price:
          </div>
          {availableDates && (
            <div className={styles.selectContainer}>
              <Select
                customStyles={styles.select}
                onChange={e => this.setState({ selectedDate: e.target.value })}
                value={selectedDate}
              >
                {availableDates.map(({ label, value }) => <option value={value}>{label}</option>)}
              </Select>
            </div>
          )}
        </div>
      </div>
    );
  }
}
