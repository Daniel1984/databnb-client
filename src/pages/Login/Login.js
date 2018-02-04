import { h } from 'preact';
import { Link } from 'preact-router/match';
import styles from './Login.scss';
import { Button, Card, SettingsPageContainer } from '../../components/common';
import LeftArrowIcon from '../../assets/icons/left-arrow.svg';

export default function Login() {
  return (
    <SettingsPageContainer title="META BNB">
      <div className={styles.cardContainer}>
        <Card title="Login">
          <div class={styles.inputContainer}>
            <input class={styles.input} type="email" placeholder="Email Address" />
          </div>
          <div class={styles.inputContainer}>
            <input class={styles.input} type="password" placeholder="Password" />
          </div>
          <div class={styles.inputContainer}>
            <Button className={styles.submitBtn}>Log In</Button>
          </div>
          <div class={styles.inputContainer}>
            <Link class={styles.forgotPassLink} href="/reset-password">Forgot password?</Link>
          </div>
        </Card>
      </div>
      <div class={styles.signupHelper}>
        Don't have an account? <Link class={styles.signupLink} href="/signup">Sign Up</Link>
      </div>
    </SettingsPageContainer>
  );
}
