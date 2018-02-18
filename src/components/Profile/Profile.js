import React from 'react';
import Settings from '../../components/Settings/Settings';
import { Card } from '../../components/common';
import styles from './Profile.scss';

export default function Profile({ user }) {
  return (
    <Settings user={user}>
      <Card flex>
        <h1>helloo</h1>
      </Card>
    </Settings>
  );
}
