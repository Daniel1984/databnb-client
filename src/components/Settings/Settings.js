import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Profile from '../Profile/Profile';
import Properties from '../Properties/Properties';
import { SettingsPageContainer, Navbar, Footer } from '../common';
import SettingsMenu from './SettingsMenu/SettingsMenu';
import styles from './Settings.scss';

Settings.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

export default function Settings({ match: { url }, history: { goBack } }) {
  return (
    <SettingsPageContainer>
      <Navbar title="Settings" goBack={goBack} />
      <div className={styles.wrapper}>
        <div className={styles.menu}>
          <SettingsMenu />
        </div>
        <div className={styles.content}>
          <div className={styles.innerContent}>
            <Route path={`${url}/profile`} component={Profile} />
            <Route path={`${url}/properties`} component={Properties} />
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </SettingsPageContainer>
  );
}
