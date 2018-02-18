import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ForOfor.scss';
import { Card, SettingsPageContainer } from '../../components/common';
import Navbar from '../../components/Navbar/Navbar';

export default function ForOfor() {
  return (
    <SettingsPageContainer>
      <Navbar title="META BNB" />
      <div className={styles.cardContainer}>
        <Card title="404 :(">
          <div className={styles.message}>
            Sorry, but the page you're trying to visit does not exist.
          </div>
          <Link className={styles.loginLink} to="/login">Login?</Link>
        </Card>
      </div>
    </SettingsPageContainer>
  );
}
