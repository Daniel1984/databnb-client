import React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, Marker } from 'react-leaflet';
import customHouseMarkerIcon from '../../shared/customHouseMarkerIcon';
import { PropertyMarkerPopup } from '../common';
import styles from './PropertiesMap.scss';

PropertiesMap.propTypes = {
  latlng: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  listings: PropTypes.arrayOf(PropTypes.shape({
    geo: PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.number),
    }),
    id: PropTypes.number,
  })).isRequired,
};

export default function PropertiesMap({ latlng: { lat, lng }, listings }) {
  return (
    <div className={styles.root}>
      <Map
        scrollWheelZoom={false}
        center={[lat, lng]}
        bounds={listings.map(({ geo: { coordinates } }) => [coordinates[1], coordinates[0]])}
        className={styles.map}
      >
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {listings.map(({
          geo: { coordinates },
          id,
          picture_url,
        }) => (
          <Marker
            icon={customHouseMarkerIcon}
            position={[coordinates[1], coordinates[0]]}
            key={id}
          >
            <PropertyMarkerPopup picUrl={picture_url} id={id} />
          </Marker>
        ))}
      </Map>
    </div>
  );
}
