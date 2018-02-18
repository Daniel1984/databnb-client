import React, { Component } from 'react';
import gravatar from 'gravatar';
import styles from './Gravatar.scss';

export default class Gravatar extends Component {
  state = {
    gravatarUrl: null
  };

  componentDidMount() {
    this.getGrvatarImage(this.props);
  }

  componentWillReceiveProps(props) {
    this.getGrvatarImage(props);
  }

  getGrvatarImage({ email, size = 200 }) {
    const gravatarUrl = gravatar.url(email, { size });
    this.setState({ gravatarUrl });
  }

  render() {
    const { gravatarUrl } = this.state;

    return (
      <div className={styles.logo} style={{ backgroundImage: `url(${gravatarUrl})` }} />
    )
  }
}
