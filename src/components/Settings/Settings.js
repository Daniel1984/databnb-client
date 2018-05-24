import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { SettingsPageContainer } from '../common';
import SettingsMenu from './SettingsMenu/SettingsMenu';
import styles from './Settings.scss';

Settings.propTypes = {
  user: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
};

Settings.defaultProps = {
  user: null,
};

export default function Settings({ user, children }) {
  return (
    <SettingsPageContainer>
      <Navbar title="Settings" />
      {!!user && (
        <div className={styles.contentWrapper}>
          <div className={styles.menu}>
            <SettingsMenu user={user} />
          </div>
          <div className={styles.content}>
            {children}
          </div>
        </div>
      )}
      <div className={styles.footer}>
        <Footer />
      </div>
    </SettingsPageContainer>
  );
}
