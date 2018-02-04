import { h } from 'preact';
import { Link } from 'preact-router/match';
import styles from './SignUp.scss';
import { Button, Card, SettingsPageContainer } from '../../components/common';
import LeftArrowIcon from '../../assets/icons/left-arrow.svg';

export default function Login() {
  return (
    <SettingsPageContainer title="META BNB">
      <div className={styles.cardContainer}>
        <Card title="Sign Up">
          <div class={styles.inputContainer}>
            <input class={styles.input} type="email" placeholder="Email Address" />
          </div>
          <div class={styles.inputContainer}>
            <input class={styles.input} type="password" placeholder="Password" />
          </div>
          <div class={styles.inputContainer}>
            <Button className={styles.submitBtn}>Sign Up</Button>
          </div>
        </Card>
      </div>
      <div class={styles.signupHelper}>
      Already have an account? <Link class={styles.signupLink} href="/login">Log In</Link>
      </div>
    </SettingsPageContainer>
  );
}
