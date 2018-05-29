import React from 'react';
import PropTypes from 'prop-types';
import Map from '../Map/Map';
import Dashboard from '../Dashboard/Dashboard';
import styles from './Heading.scss';

Heading.propTypes = {
  latlng: PropTypes.shape({}),
  listings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  updateParentState: PropTypes.func.isRequired,
};

Heading.defaultProps = {
  latlng: undefined,
};

export default function Heading({ latlng, listings, updateParentState }) {
  return (
    <div className={styles.root}>
      <div className={styles.mapCol}>
        {!listings.length && (
          <div className={styles.infoContainer}>
            <div className={styles.infoText}>
              <h1 className={styles.header}>Free Airbnb Income Calculator</h1>
              <div>Find how much your property could earn on airbnb or any other short term rental platform.</div>
              <br />
              <div>
                Quickly adopt to market changes by following our recommendations.
                Increase occupancy and income.
              </div>
            </div>
          </div>
        )}
        {!!listings.length && (
          <div className={styles.mapContainer}>
            <Map latlng={latlng} listings={listings} />
          </div>
        )}
      </div>
      <div className={styles.controlsCol}>
        <Dashboard listings={listings} updateParentState={state => updateParentState(state)} />
      </div>
    </div>
  );
}
