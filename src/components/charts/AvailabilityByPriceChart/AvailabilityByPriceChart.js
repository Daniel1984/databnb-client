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
    const data = listings.map(({ availability }) => {
      const availabilityKeys = Object.keys(availability);

      const summedAvailabilities = availabilityKeys.reduce((acc, key) => {
        const { availabilities } = availability[key];

        const availablePerMonth = availabilities.reduce((acc, { available }) => {
          acc = [...acc, available];
          return acc;
        }, []);

        const occupiedPerMonth = availablePerMonth.filter(available => !available).length;
        acc[key] = occupiedPerMonth * 100 / availablePerMonth.length;
        return acc;
      }, {});

      return summedAvailabilities;
    });

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
