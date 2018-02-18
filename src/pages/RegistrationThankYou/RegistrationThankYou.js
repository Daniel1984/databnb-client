import React from 'react';
import { parse } from 'qs';
import { Link } from 'react-router-dom';
import styles from './RegistrationThankYou.scss';
import { Card, SettingsPageContainer } from '../../components/common';
import Navbar from '../../components/Navbar/Navbar';

export default function RegistrationThankYou({ location }) {
  const { email } = parse(location.search.substr(1));
  return (
    <SettingsPageContainer>
      <Navbar  backTo="/" title="META BNB" />
      <div className={styles.cardContainer}>
        <Card title="Thank you for registering with Metabnb!">
          <div className={styles.message}>
            We're more than happy that you have chosen our services and can't wait to get started increasing your income!
          </div>
          <Link className={styles.loginLink} to={`/login?email=${email}`}>Login?</Link>
        </Card>
      </div>
    </SettingsPageContainer>
  );
}
