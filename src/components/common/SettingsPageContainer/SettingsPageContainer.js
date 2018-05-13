import React from 'react';
import PropTypes from 'prop-types';
import styles from './SettingsPageContainer.scss';

SettingsPageContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function SettingsPageContainer({ children }) {
  return (
    <div className={styles.root}>
      {children}
    </div>
  );
}
