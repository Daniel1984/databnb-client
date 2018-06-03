import React from 'react';
import { Card } from '../common';
import ToolsIcon from '../../assets/icons/tools.svg';
import styles from './Billing.scss';

export default function Billing() {
  return (
    <Card flex>
      <img alt="Tools icon" className={styles.icon} src={ToolsIcon} />
    </Card>
  );
}
