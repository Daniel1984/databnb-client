import { h, Component } from 'preact';
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
  componentWillReceiveProps({ listings }) {
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
      <div class={styles.root}>
        <div class={styles.col}>
          <AvailabilityChart label="Availability by pricing" labels={labels} data={data} />
        </div>
        <div class={classnames([styles.col, styles.info])}>
          <div class={styles.colTitle}>
            Property availability percentage depending on price:
          </div>
          {availableDates && (
            <div class={styles.selectContainer}>
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
