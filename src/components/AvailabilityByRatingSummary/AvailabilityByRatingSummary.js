import { h, Component } from 'preact';
import classnames from 'classnames';
import format from 'date-fns/format'
import styles from './AvailabilityByRatingSummary.scss';
import { AvailabilityChart } from '../charts';
import { Select, Checkbox } from '../common';

function extractAvailabilityData({ star_rating, availability }) {
  return Object.keys(availability).reduce((acc, key) => {
    const { availabilities } = availability[key];

    const availabilitiesPerMonth = availabilities.reduce((acc, { available }) => {
      acc = [...acc, available];
      return acc;
    }, []);

    const occupiedTimesPerMonth = availabilitiesPerMonth.filter(available => !available).length;

    const occupancyAndRating = {
      occupancyPercentage: occupiedTimesPerMonth * 100 / availabilitiesPerMonth.length,
      rating: star_rating,
    };

    acc[key] = occupancyAndRating;
    return acc;
  }, {});
};

function putSameDateAvailabilitiesInGroups(acc, availability) {
  Object.keys(availability).forEach((key) => {
    acc[key] = acc[key] ? [...acc[key], availability[key]] : [availability[key]];
  });

  return acc;
};

function getCombinedDataByRating(availabilities) {
  const combinedAvailabilities = availabilities.reduce((acc, { occupancyPercentage, rating }) => {
    acc[rating] = acc[rating] ? [...acc[rating], occupancyPercentage] : [occupancyPercentage];
    return acc;
  }, {});

  return Object.keys(combinedAvailabilities).map((key) => {
    const combinedPercentage = combinedAvailabilities[key];

    return {
      rating: key === 'null' ? null : Number(key),
      occupancyPercentage: combinedPercentage.reduce((acc, curr) => acc + curr) / combinedPercentage.length
    }
  });
}

export default class AvailabilityByRatingSummary extends Component {
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

  getChartData() {
    const { groupedAvailabilities, selectedDate, combinedByRating } = this.state;
    let availabilities = groupedAvailabilities ? groupedAvailabilities[selectedDate] : [];

    if (combinedByRating) {
      availabilities = getCombinedDataByRating(availabilities);
    }

    if (availabilities.length) {
      availabilities = availabilities.sort((a, b) => Number(a.rating) - Number(b.rating));
    }

    return {
      labels: availabilities.map(({ rating }) => !rating || rating === 'null' ? '0 stars' : `${rating} stars`),
      data: availabilities.map(({ occupancyPercentage }) => occupancyPercentage),
    };
  }

  render() {
    const { availableDates, selectedDate } = this.state;
    const { labels, data } = this.getChartData();

    return (
      <div class={styles.root}>
        <div class={styles.col}>
          <AvailabilityChart label="Occupancy by rating" labels={labels} data={data} />
        </div>
        <div class={classnames([styles.col, styles.info])}>
          <div class={styles.colTitle}>
            Property occupancy percentage depending on rating:
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

          <div class={styles.toggleContainer}>
            <Checkbox
              label="Combined by rating:"
              onChange={(e) => this.setState({ combinedByRating: e.target.checked })}
            />
          </div>
        </div>
      </div>
    );
  }
}
