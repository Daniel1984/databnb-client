import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Profile from '../../components/Profile/Profile';
import Billing from '../../components/Billing/Billing';
import Reports from '../../components/Reports/Reports';
import Properties from '../../components/Properties/Properties';
import axios from '../../shared/axios';
import config from '../../../config';
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

  state = {
    user: null,
  };

  componentDidMount = async () => {
    try {
      const { data: user } = await axios.get(`${config.apiUrl}/me`);
      this.setState({ user });
    } catch (error) {
      this.props.history.push('/login');
    }
  }

  render() {
    const { match } = this.props;
    const { user } = this.state;
    return (
      <div className={styles.root}>
        <Route path={`${match.url}/profile`} component={() => <Profile user={user} />} />
        <Route path={`${match.url}/billing`} component={() => <Billing user={user} />} />
        <Route path={`${match.url}/reports`} component={() => <Reports user={user} />} />
        <Route path={`${match.url}/properties`} component={() => <Properties user={user} />} />
      </div>
    );
  }
}
