import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Profile from '../../components/Profile/Profile';
import Billing from '../../components/Billing/Billing';
import Reports from '../../components/Reports/Reports';
import fetch from '../../shared/fetch';
import config from '../../../config';
import styles from './Settings.scss';

export default class Settings extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    fetch(`${config.apiUrl}/me`)
      .then(user => this.setState({ user }))
      .catch(() => this.props.history.push('/login'));
  }

  render() {
    const { match } = this.props;
    const { user } = this.state;
    return (
      <div className={styles.root}>
        <Route path={`${match.url}/profile`} component={() => <Profile user={user} />} />
        <Route path={`${match.url}/billing`} component={() => <Billing user={user} />} />
        <Route path={`${match.url}/reports`} component={() => <Reports user={user} />} />

        {/* <Route
          exact
          path={match.url}
          render={() => <h3>Please select a topic.</h3>}
        /> */}
      </div>
    );
  }
}
