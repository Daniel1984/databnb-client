import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { PropertiesProvider } from '../../containers/Properties';
import PropertySettings from './PropertySettings/PropertySettings';
import Property from './Property/Property';
import styles from './Properties.scss';

export default function Properties({ match: { url } }) {
  return (
    <PropertiesProvider>
      <div className={styles.root}>
        <Route exact path={`${url}`} component={PropertySettings} />
        <Route exact path={`${url}/:propertyId`} component={Property} />
      </div>
    </PropertiesProvider>
  );
}

Properties.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
