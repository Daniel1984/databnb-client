import React from 'react';
import PropTypes from 'prop-types';
import { SettingsPageContainer, Navbar, Footer } from '../../common';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import styles from './SettingsContainer.scss';

SettingsContainer.propTypes = {
  user: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
};

SettingsContainer.defaultProps = {
  user: null,
};

export default function SettingsContainer({ user, children }) {
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
