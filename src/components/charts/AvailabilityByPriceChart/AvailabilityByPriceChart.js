import Chart from 'chart.js';
import format from 'date-fns/format'
import { h, Component } from 'preact';

function extractAvailabilityData({ star_rating, availability }) {
  return Object.keys(availability).reduce((acc, key) => {
    const { availabilities, nativeAdjustedPriceTotal, nativePriceTotal } = availability[key];

    const availabilitiesPerMonth = availabilities.reduce((acc, { available }) => {
      acc = [...acc, available];
      return acc;
    }, []);

    const occupiedTimesPerMonth = availabilitiesPerMonth.filter(available => !available).length;

    const occupancyAndRating = {
      occupancyPercentage: occupiedTimesPerMonth * 100 / availabilitiesPerMonth.length,
      rating: star_rating,
      monthlyPrice: nativeAdjustedPriceTotal || nativePriceTotal,
    };

    acc[key] = occupancyAndRating;
    return acc;
  }, {});
};

function putSameDateAvailabilitiesInGroups(acc, availability) {
  Object.keys(availability).forEach((key) => {
    acc[key] = acc[key] ? [...acc[key], availability[key]] : [availability[key]];
  });

  return acc
};

export default class AvailabilityByPriceChart extends Component {
  componentDidMount() {
    const ctx = this.chartEl.getContext('2d');
    this.ratingsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Avalability by pricing',
          backgroundColor: 'rgb(253, 86, 34)',
          data: []
        }]
      },
      options: {
        responsive: true,
        title: {
          display: false,
        }
      }
    });
  }

  componentWillReceiveProps({ listings }) {
    const groupedAvailabilities = listings
      .map(extractAvailabilityData)
      .reduce(putSameDateAvailabilitiesInGroups, {});

    const availableDates = Object.keys(groupedAvailabilities)
      .map((date) => {
        return {
          label: date.replace(/-/, ' '),
          value: date,
        };
      })
      .sort((a, b) => format(a.value, 'YYYY-MM-DD') > format(b.value, 'YYYY-MM-DD'));

    this.setState({
      availableDates,
      selectedDate: availableDates[0].value,
      groupedAvailabilities,
    });

    /*
      1. add option select or tabs to switch between available Month-year
      2. only display occupancy rate for selected month not sum or avg
      3. maybe add rating filter to filer by rating too
    */
    console.log('------------------> ', groupedAvailabilities);

    this.ratingsChart.data.labels = groupedAvailabilities[availableDates[0].value].map(({ monthlyPrice }) => monthlyPrice);
    this.ratingsChart.data.datasets[0].data = groupedAvailabilities[availableDates[0].value].map(({ occupancyPercentage }) => occupancyPercentage);
    this.ratingsChart.update();
  }

  render() {
    return (
      <canvas ref={el => this.chartEl = el} />
    )
  }
}

