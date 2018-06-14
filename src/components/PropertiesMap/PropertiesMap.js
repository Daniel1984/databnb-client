import React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import customHouseMarkerIcon from '../../shared/customHouseMarkerIcon';
import LinkIcon from 'react-icons/lib/fa/external-link';
import styles from './PropertiesMap.scss';

PropertiesMap.propTypes = {
  latlng: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  listings: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
    id: PropTypes.number,
  })).isRequired,
};

export default function PropertiesMap({ latlng: { lat, lng }, listings }) {
  console.log(listings)
  return (
    <div className={styles.root}>
      <Map
        scrollWheelZoom={false}
        center={[lat, lng]}
        bounds={listings.map(({ lat, lng }) => [lat, lng])}
        className={styles.map}
      >
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {listings.map(({
          lat,
          lng,
          id,
          picture_url,
        }) => (
          <Marker
            icon={customHouseMarkerIcon}
            position={[lat, lng]}
            key={id}
          >
            <Popup>
              <div
                className={styles.popupImage}
                style={{ backgroundImage: `url(${picture_url})` }}
              />
              <a
                className={styles.link}
                rel="noopener noreferrer"
                target="_blank"
                href={`http://airbnb.com/rooms/${id}`}
              >
                View Property <LinkIcon />
              </a>
            </Popup>
          </Marker>
        ))}
      </Map>
    </div>
  );
}
