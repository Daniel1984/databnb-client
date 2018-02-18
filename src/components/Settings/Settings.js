import React from 'react';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import SettingsMenu from '../../components/SettingsMenu/SettingsMenu';
import { SettingsPageContainer } from '../../components/common';
import styles from './Settings.scss';

export default function Settings({ user, children }) {
  return (
    <SettingsPageContainer title="Metabnb Account Settings">
      <Navbar backTo="/" title="Settings" />
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
