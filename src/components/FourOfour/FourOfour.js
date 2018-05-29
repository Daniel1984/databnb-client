import React from 'react';
import { Link } from 'react-router-dom';
import { Card, SettingsPageContainer, Navbar } from '../../components/common';
import styles from './FourOfour.scss';

export default function FourOfour() {
  return (
    <SettingsPageContainer>
      <Navbar title="META BNB" />
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
