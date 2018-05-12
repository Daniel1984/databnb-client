import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import SettingsMenu from '../../components/SettingsMenu/SettingsMenu';
import { SettingsPageContainer } from '../../components/common';
import styles from './Settings.scss';

Settings.propTypes = {
  user: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
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
