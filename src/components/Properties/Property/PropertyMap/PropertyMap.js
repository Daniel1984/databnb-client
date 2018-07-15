import React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import customHouseMarkerIcon from '../../../../shared/customHouseMarkerIcon';
import { PropertyMarkerPopup } from '../../../common';
import styles from './PropertyMap.scss';

PropertyMap.propTypes = {
  property: PropTypes.shape({
    geo: PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.number),
    }),
    picture_url: PropTypes.string,
  }).isRequired,
  nearbyListings: PropTypes.arrayOf(PropTypes.shape({})),
};

PropertyMap.defaultProps = {
  nearbyListings: [],
};

export default function PropertyMap({
  property: {
    geo: { coordinates },
    picture_url,
    id,
  },
  nearbyListings,
}) {
  return (
    <Map
      scrollWheelZoom={false}
      center={[coordinates[1], coordinates[0]]}
      zoom={16}
      className={styles.map}
    >
      <TileLayer url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png" />
      {nearbyListings.map(({
        geo: { coordinates },
        id,
        picture_url,
      }) => (
        <Marker
          position={[coordinates[1], coordinates[0]]}
          key={id}
        >
          <PropertyMarkerPopup picUrl={picture_url} id={id} />
        </Marker>
      ))}
      <Marker
        icon={customHouseMarkerIcon}
        position={[coordinates[1], coordinates[0]]}
      >
        <Popup>
          <PropertyMarkerPopup picUrl={picture_url} id={id} />
        </Popup>
      </Marker>
    </Map>
  );
}
