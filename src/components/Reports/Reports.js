import React from 'react';
import Settings from '../../components/Settings/Settings';
import { Card } from '../../components/common';
import styles from './Reports.scss';

export default function Reports({ user }) {
  return (
    <Settings user={user}>
      <Card flex>
        <h1>reports</h1>
      </Card>
    </Settings>
  );
}
