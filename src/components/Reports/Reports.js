import React from 'react';
import PropTypes from 'prop-types';
import SettingsContainer from '../Settings/SettingsContainer/SettingsContainer';
import { Card } from '../common';
import ToolsIcon from '../../assets/icons/tools.svg';
import styles from './Reports.scss';

Reports.propTypes = {
  user: PropTypes.shape({}).isRequired,
};

export default function Reports({ user }) {
  return (
    <SettingsContainer user={user}>
      <Card flex>
        <img alt="Tools icon" className={styles.icon} src={ToolsIcon} />
      </Card>
    </SettingsContainer>
  );
}
