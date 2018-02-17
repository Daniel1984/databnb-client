import { h } from 'preact';
import { Link } from 'preact-router/match';
import fetch from '../../shared/fetch';
import config from '../../../config';
import { Gravatar } from '../common';
import styles from './SettingsMenu.scss';

const settingsMenuLinks = [
  {
    href: '/settings/profile',
    name: 'Profile'
  },
  {
    href: '/settings/billing',
    name: 'Billing'
  },
  {
    href: '/settings/reports',
    name: 'Reports'
  },
  {
    href: '/settings/notifications',
    name: 'Notifications'
  },
];

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
      </div>
      <nav class={styles.nav}>
        {settingsMenuLinks.map(({ href, name }) => (
          <Link class={styles.link} activeClassName={styles.activeLink} href={href}>
            {name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
