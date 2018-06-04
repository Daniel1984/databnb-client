import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, SettingsPageContainer, Navbar } from '../../components/common';
import styles from './FourOfour.scss';

FourOfour.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

export default function FourOfour({ history: { goBack } }) {
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
