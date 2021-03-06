import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withAuthContainer } from '../../../containers/Auth';
import { Gravatar } from '../../common';
import styles from './SettingsMenu.scss';

const settingsMenuLinks = [
  {
    href: '/settings/profile',
    name: 'Profile',
  },
  {
    href: '/settings/properties',
    name: 'Properties',
  },
];

SettingsMenu.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
};

SettingsMenu.defaultProps = {
  user: null,
};

export function SettingsMenu({ user }) {
  return user ? (
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
  ) : null;
}

export default withAuthContainer(SettingsMenu);
