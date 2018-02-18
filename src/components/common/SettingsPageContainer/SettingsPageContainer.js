import React from 'react';
import styles from './SettingsPageContainer.scss';

export default function SettingsPageContainer({ children }) {
  return (
    <div className={styles.root}>
      {children}
    </div>
  );
}
