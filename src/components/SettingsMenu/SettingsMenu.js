import React from 'react';
import { NavLink } from 'react-router-dom';
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
];

export default function SettingsMenu({ user }) {
  return (
    <div className={styles.root}>
      <div className={styles.heading}>
        <div className={styles.gravatarHalo}>
          <div className={styles.gravatar}>
            <Gravatar email={user.email} size={300} />
          </div>
        </div>
        <div className={styles.name}>
          {user.email.split('@')[0]}
        </div>
      </div>
      <nav className={styles.nav}>
        {settingsMenuLinks.map(({ href, name }) => (
          <NavLink
            key={name}
            className={styles.link}
            activeClassName={styles.activeLink}
            to={href}
          >
            {name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
