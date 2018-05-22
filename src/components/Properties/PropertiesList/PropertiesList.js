import React from 'react';
import PropTypes from 'prop-types';
import styles from './PropertiesList.scss';

PropertiesList.propTypes = {
  properties: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default function PropertiesList({ properties }) {
  return (
    <div className={styles.root}>
      {properties.map(property => (
        <h1>ho ho ho</h1>
      ))}
    </div>
  );
}
