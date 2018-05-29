import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Gravatar } from '../../common';
import styles from './AuthControls.scss';

AuthControls.propTypes = {
  user: PropTypes.shape({}),
};

AuthControls.defaultProps = {
  user: null,
};

export default function AuthControls({ user }) {
  return (
    <div className={styles.authControls}>
      {!user && (
        <div className={styles.ctaContainer}>
          <Link to="/login" className={styles.loginBtn}>Login</Link>
          <Link to="/signup" className={styles.signupBtn}>Sign Up</Link>
        </div>
      )}

      {user && (
        <div className={styles.userInfo}>
          <div className={styles.gravatar}>
            <Gravatar email={user.email} size={200} />
          </div>
          <div className={styles.ctaContainer}>
            <Link to="/settings/profile" className={styles.settingsBtn}>Settings</Link>
            <Link
              className={styles.logoutBtn}
              onClick={() => sessionStorage.clear()}
              to="/"
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}