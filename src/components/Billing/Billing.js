import React from 'react';
import Settings from '../../components/Settings/Settings';
import { Card } from '../../components/common';
import styles from './Billing.scss';

export default function Billing({ user }) {
  return (
    <Settings user={user}>
      <Card flex>
        <h1>billing</h1>
      </Card>
    </Settings>
  );
}
