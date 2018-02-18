import React from 'react';
import Settings from '../../components/Settings/Settings';
import RedirectUnauthenticated from '../../components/RedirectUnauthenticated/RedirectUnauthenticated';
import { Card } from '../../components/common';
import styles from './Profile.scss';
import fetch from '../../shared/fetch';
import config from '../../../config';

export default class Profile extends RedirectUnauthenticated {
  state = {
    user: null
  };

  componentDidMount() {
    fetch(`${config.apiUrl}/me`)
      .then(user => this.setState({ user }))
      .catch(() => route(this.props.to, true));
  }

  render() {
    const { user } = this.state;

    return (
      <Settings user={user}>
        <Card flex>
          <h1>helloo</h1>
        </Card>
      </Settings>
    );
  }
}
