import Chart from 'chart.js';
import { h, Component } from 'preact';

const CITY_TO_CURRENCY = {
  london: 'gbp',
};

function getDistanceFromLatLonInM({ lat1, lng1, lat2, lng2 }) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);  // deg2rad below
  const dLon = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return Math.floor(d * 1000);
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function sortPricesByDistanceAscending(a, b) {
  if (a.distance < b.distance) {
    return -1;
  } else

  if (a.distance > b.distance) {
    return 1;
  }

  return 0;
}

export default class PriceByDistanceChart extends Component {
  componentDidMount() {
    const ctx = this.chartEl.getContext('2d');
    this.priceByDistanceChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: '',
          backgroundColor: 'rgb(233, 30, 98)',
          borderColor: 'rgb(137, 193, 73)',
          data: [],
          fill: false,
        }]
      },
    });
  }

  componentWillReceiveProps({ listings, latlng, address }) {
    const currency = CITY_TO_CURRENCY[listings[0].city];
    const data = listings
      .map(({ lat, lng, availability }) => {
        const distance = getDistanceFromLatLonInM({ lat1: latlng.lat, lng1: latlng.lng, lat2: lat, lng2: lng });
        const availabilityKeys = Object.keys(availability);

        const totalPrice = availabilityKeys.reduce((acc, currentKey) => {
          const { nativeAdjustedPriceTotal, nativePriceTotal } = availability[currentKey];
          acc = acc + (nativeAdjustedPriceTotal || nativePriceTotal);
          return acc;
        }, 0);

        const avgPrice = Math.ceil(totalPrice / availabilityKeys.length);

        return {
          distance,
          avgPrice,
        };
      })
      .sort(sortPricesByDistanceAscending);

    this.priceByDistanceChart.data.labels = data.map(({ distance }) => `${distance} m` );
    this.priceByDistanceChart.data.datasets[0].data = data.map(({ avgPrice }) => avgPrice );
    this.priceByDistanceChart.data.datasets[0].label = `Currency: ${currency} / Distance: meters`;
    this.priceByDistanceChart.update();
  }

  render() {
    return (
      <canvas ref={el => this.chartEl = el} />
    )
  }
}
