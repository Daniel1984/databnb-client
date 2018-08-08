import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, SettingsPageContainer, Navbar } from '../../components/common';
import styles from './FourOfour.scss';

export default class FourOfour extends PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      goBack: PropTypes.func,
    }).isRequired,
  };

  render() {
    const { history: { goBack } } = this.props;

    return (
      <SettingsPageContainer>
        <Navbar title="META BNB" goBack={goBack} />
        <div className={styles.cardContainer}>
          <Card title="404 :(">
            <div className={styles.message}>
              Sorry, but the page you`re trying to visit does not exist.
            </div>
            <Link className={styles.loginLink} to="/login">Login?</Link>
          </Card>
        </div>
      </SettingsPageContainer>
    );
  }
}
