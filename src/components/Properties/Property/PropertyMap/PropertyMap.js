import React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import customHouseMarkerIcon from '../../../../shared/customHouseMarkerIcon';
import { PropertyMarkerPopup } from '../../../common';
import styles from './PropertyMap.scss';

PropertyMap.propTypes = {
  property: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
    picture_url: PropTypes.string,
  }).isRequired,
  nearbyListings: PropTypes.arrayOf(PropTypes.shape({})),
};

PropertyMap.defaultProps = {
  nearbyListings: [],
};

export default function PropertyMap({ property, nearbyListings }) {
  return (
    <Map
      scrollWheelZoom={false}
      center={[property.lat, property.lng]}
      zoom={16}
      className={styles.map}
    >
      <TileLayer url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png" />
      {nearbyListings.map(({
        lat,
        lng,
        id,
        picture_url,
      }) => (
        <Marker
          position={[lat, lng]}
          key={id}
        >
          <PropertyMarkerPopup picUrl={picture_url} id={id} />
        </Marker>
      ))}
      <Marker
        icon={customHouseMarkerIcon}
        position={[property.lat, property.lng]}
      >
        <Popup>
          <PropertyMarkerPopup picUrl={property.picture_url} id={property.id} />
        </Popup>
      </Marker>
    </Map>
  );
}
