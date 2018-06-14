import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Gravatar } from '../../common';
import { withAuthContainer } from '../../../containers/Auth';
import styles from './AuthControls.scss';

AuthControls.propTypes = {
  user: PropTypes.shape({}),
  clearAuthData: PropTypes.func.isRequired,
};

AuthControls.defaultProps = {
  user: null,
};

export function AuthControls({ user, clearAuthData }) {
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
            <Link to="/settings/profile" className={styles.settingsBtn}>Account</Link>
            <Link
              className={styles.logoutBtn}
              onClick={() => clearAuthData()}
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

export default withAuthContainer(AuthControls);
