import React, { Component } from 'react';

export default class RedirectUnauthenticated extends Component {
  componentWillMount() {
    const authToken = sessionStorage.getItem('auth-token');

    if (!authToken) {
      this.props.history.push(this.props.to);
    }
  }

  render() {
    return null;
  }
}
