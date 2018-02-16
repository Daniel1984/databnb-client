import { h } from 'preact';
import fetch from '../../shared/fetch';
import config from '../../../config';
import { Gravatar } from '../common';
import styles from './SettingsMenu.scss';

export default function SettingsMenu({ user }) {
  return (
    <div class={styles.root}>
      <div class={styles.heading}>
        <div class={styles.gravatar}>
          <Gravatar email={user.email} size={300} />
        </div>
        <div>
          {user.email.split('@')[0]}
        </div>
      </div>
    </div>
  );
}
