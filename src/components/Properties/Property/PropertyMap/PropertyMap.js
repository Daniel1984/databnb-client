import React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import styles from './PropertyMap.scss';

PropertyMap.propTypes = {
  property: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
    picture_url: PropTypes.string,
  }).isRequired,
};

export default function PropertyMap({ property }) {
  return (
    <Map
      scrollWheelZoom={false}
      center={[property.lat, property.lng]}
      zoom={14}
      className={styles.map}
    >
      <TileLayer url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png" />
      <Marker position={[property.lat, property.lng]}>
        <Popup>
          <div
            className={styles.heroImage}
            style={{ backgroundImage: `url(${property.picture_url})` }}
          />
        </Popup>
      </Marker>
    </Map>
  );
}
