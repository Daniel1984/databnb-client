import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Profile from '../Profile/Profile';
import Billing from '../Billing/Billing';
import Reports from '../Reports/Reports';
import Properties from '../Properties/Properties';
import styles from './Settings.scss';

export default class Settings extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    match: PropTypes.shape({
      url: PropTypes.string,
    }).isRequired,
  };


  render() {
    const { match } = this.props;
    return (
      <div className={styles.root}>
        <Route path={`${match.url}/profile`} component={Profile} />
        <Route path={`${match.url}/billing`} component={Billing} />
        <Route path={`${match.url}/reports`} component={Reports} />
        <Route path={`${match.url}/properties`} component={Properties} />
      </div>
    );
  }
}
