import React from 'react';
import SettingsContainer from '../Settings/SettingsContainer/SettingsContainer';
import { Card } from '../common';
import ToolsIcon from '../../assets/icons/tools.svg';
import styles from './Reports.scss';

export default function Reports() {
  return (
    <SettingsContainer>
      <Card flex>
        <img alt="Tools icon" className={styles.icon} src={ToolsIcon} />
      </Card>
    </SettingsContainer>
  );
}
