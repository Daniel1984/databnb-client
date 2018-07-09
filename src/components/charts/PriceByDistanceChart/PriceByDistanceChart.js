import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LineChart from '../LineChart/LineChart';

function getDistanceFromLatLonInM({
  lat1,
  lng1,
  lat2,
  lng2,
}) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lng2 - lng1);
  const halfSinDlat = Math.sin(dLat / 2);
  const halfSinDlon = Math.sin(dLon / 2);
  const a =
    halfSinDlat * halfSinDlat +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    halfSinDlon * halfSinDlon;
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

function getPriceByDistane({
  lat,
  lng,
  availability,
  latlng,
}) {
  const distance = getDistanceFromLatLonInM({
    lat1: latlng.lat,
    lng1: latlng.lng,
    lat2: lat,
    lng2: lng,
  });

  const availabilityKeys = Object.keys(availability);

  const totalPrice = availabilityKeys.reduce((acc, currentKey) => {
    const { nativeAdjustedPriceTotal, nativePriceTotal } = availability[currentKey];
    acc += (nativeAdjustedPriceTotal || nativePriceTotal);
    return acc;
  }, 0);

  const avgPrice = Math.ceil(totalPrice / availabilityKeys.length);

  return { distance, avgPrice };
}

export default class PriceByDistanceChart extends PureComponent {
  static propTypes = {
    listings: PropTypes.arrayOf(PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
      availability: PropTypes.shape({}),
    })).isRequired,
    latlng: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }).isRequired,
  };

  render() {
    const { listings, latlng } = this.props;

    const data = listings
      .map(listing => getPriceByDistane({ ...listing, latlng }))
      .sort(sortPricesByDistanceAscending);

    return (
      <LineChart
        labels={data.map(({ distance }) => `${distance} m`)}
        data={data.map(({ avgPrice }) => avgPrice)}
        label="Price / Distance"
      />
    );
  }
}
