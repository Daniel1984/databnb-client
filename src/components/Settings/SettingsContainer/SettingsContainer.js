import React from 'react';
import PropTypes from 'prop-types';
import { SettingsPageContainer, Navbar, Footer } from '../../common';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import styles from './SettingsContainer.scss';

SettingsContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function SettingsContainer({ children }) {
  return (
    <SettingsPageContainer>
      <Navbar title="Settings" />
      <div className={styles.contentWrapper}>
        <div className={styles.menu}>
          <SettingsMenu />
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </SettingsPageContainer>
  );
}
