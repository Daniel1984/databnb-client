import Chart from 'chart.js';
import { h, Component } from 'preact';
import { CHART_COLORS } from '../utils';

export default class AvailabilityByPriceChart extends Component {
  componentDidMount() {
    const ctx = this.chartEl.getContext('2d');
    this.ratingsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Avalability by pricing',
          // backgroundColor: 'rgba(255, 100, 22, 0.5)',
          // borderColor: 'rgb(255, 100, 22)',
          // borderWidth: 1,
          data: []
        }]
      },
      options: {
        title: {
          display: false,
        }
      }
    });
  }

  componentWillReceiveProps({ listings }) {
    const data = listings
      .map(({ star_rating, availability }) => {
        const summedAvailabilities = Object.keys(availability).reduce((acc, key) => {
          const { availabilities, nativeAdjustedPriceTotal, nativePriceTotal } = availability[key];

          const availabilitiesPerMonth =  availabilities.reduce((acc, { available }) => {
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

        return summedAvailabilities;
      })
      .reduce((acc, availability) => {
        Object.keys(availability).forEach((key) => {
          acc[key] = acc[key] ? [...acc[key], availability[key]] : [availability[key]];
        });
        return acc
      }, {});

    /*
      1. add option select or tabs to switch between available Month-year
      2. only display occupancy rate for selected month not sum or avg
      3. maybe add rating filter to filer by rating too
    */
    console.log('------------------> ', data);

    // const rankingKeys = Object.keys(ratings).sort();
    // const data = rankingKeys.map(key => ratings[key]);
    // const backgroundColor = CHART_COLORS.slice(0, rankingKeys.length);

    // this.ratingsChart.data.labels = labels;
    // this.ratingsChart.data.datasets[0].data = data;
    // this.ratingsChart.data.datasets[0].backgroundColor = backgroundColor;
    // this.ratingsChart.update();
  }

  render() {
    return (
      <canvas ref={el => this.chartEl = el} />
    )
  }
}
