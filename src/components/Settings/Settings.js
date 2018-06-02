import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Profile from '../Profile/Profile';
import Billing from '../Billing/Billing';
import Reports from '../Reports/Reports';
import Properties from '../Properties/Properties';
import styles from './Settings.scss';

Settings.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};

export default function Settings({ match: { url } }) {
  return (
    <div className={styles.root}>
      <Route path={`${url}/profile`} component={Profile} />
      <Route path={`${url}/billing`} component={Billing} />
      <Route path={`${url}/reports`} component={Reports} />
      <Route path={`${url}/properties`} component={Properties} />
    </div>
  );
}
