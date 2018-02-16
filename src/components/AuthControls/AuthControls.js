import { h } from 'preact';
import { Link } from 'preact-router/match';
import styles from './AuthControls.scss';
import { Gravatar } from '../common';

export default function AuthControls({ user }) {
  return (
    <div class={styles.authControls}>
      {!user && (
        <div class={styles.ctaContainer}>
          <Link href="/login" class={styles.loginBtn}>Login</Link>
          <Link href="/signup" class={styles.signupBtn}>Sign Up</Link>
        </div>
      )}

      {user && (
        <div class={styles.userInfo}>
          <div class={styles.gravatar}>
            <Gravatar email={user.email} size={200} />
          </div>
          <div class={styles.ctaContainer}>
            <Link href="/settings" class={styles.settingsBtn}>Settings</Link>
            <Link
              class={styles.logoutBtn}
              onClick={() => sessionStorage.clear()}
              href="/"
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
