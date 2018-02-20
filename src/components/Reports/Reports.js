import React from 'react';
import Settings from '../../components/Settings/Settings';
import { Card } from '../../components/common';
import ToolsIcon from '../../assets/icons/tools.svg';
import styles from './Reports.scss';

export default function Reports({ user }) {
  return (
    <Settings user={user}>
      <Card flex>
        <img className={styles.icon} src={ToolsIcon} />
      </Card>
    </Settings>
  );
}
