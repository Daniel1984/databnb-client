import { h } from 'preact';
import { Link } from 'preact-router/match';
import fetch from '../../shared/fetch';
import config from '../../../config';
import { Gravatar } from '../common';
import styles from './SettingsMenu.scss';

export default function SettingsMenu({ user }) {
  return (
    <div class={styles.root}>
      <div class={styles.heading}>
        <div class={styles.gravatarHalo}>
          <div class={styles.gravatar}>
            <Gravatar email={user.email} size={300} />
          </div>
        </div>
        <div class={styles.name}>
          {user.email.split('@')[0]}
        </div>
        <nav class={styles.nav}>
          <Link class={styles.link} activeClassName={styles.activeLink} href="/settings/profile">
            Profile
          </Link>
          <Link class={styles.link} activeClassName={styles.activeLink} href="/settings/billing">
            Billing
          </Link>
        </nav>
      </div>
    </div>
  );
}
