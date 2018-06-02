import React from 'react';
import SettingsContainer from '../Settings/SettingsContainer/SettingsContainer';
import { Card } from '../common';
import ToolsIcon from '../../assets/icons/tools.svg';
import styles from './Billing.scss';

export default function Billing() {
  return (
    <SettingsContainer>
      <Card flex>
        <img alt="Tools icon" className={styles.icon} src={ToolsIcon} />
      </Card>
    </SettingsContainer>
  );
}
