import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'react-leaflet';
import LinkIcon from 'react-icons/lib/fa/external-link';
import styles from './PropertyMarkerPopup.scss';

PropertyMarkerPopup.propTypes = {
  picUrl: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default function PropertyMarkerPopup({ picUrl, id }) {
  return (
    <Popup>
      <div
        className={styles.popupImage}
        style={{ backgroundImage: `url(${picUrl})` }}
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
  );
}
