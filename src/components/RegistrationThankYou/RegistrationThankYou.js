import React from 'react';
import PropTypes from 'prop-types';
import { parse } from 'qs';
import { Link } from 'react-router-dom';
import { Card, SettingsPageContainer, Navbar } from '../../components/common';
import styles from './RegistrationThankYou.scss';

RegistrationThankYou.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

export default function RegistrationThankYou({ location, history: { goBack } }) {
  const { email } = parse(location.search.substr(1));

  return (
    <SettingsPageContainer>
      <Navbar title="META BNB" goBack={goBack} />
      <div className={styles.cardContainer}>
        <Card title="Thank you for registering with Metabnb!">
          <div className={styles.message}>
            We`re more than happy that you have chosen our services{' '}
            and can`t wait to get started increasing your income!
          </div>
          <Link className={styles.loginLink} to={`/login?email=${email}`}>Login?</Link>
        </Card>
      </div>
    </SettingsPageContainer>
  );
}
