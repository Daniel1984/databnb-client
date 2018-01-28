import { h } from 'preact';
import { Link } from 'preact-router/match';
import styles from './Login.scss';
import { Button } from '../../components/common';
import LeftArrowIcon from '../../assets/icons/left-arrow.svg';

export default function Login() {
  return (
    <div class={styles.root}>
      <Link class={styles.backBtn} href="/">
        <img class={styles.backIcon} src={LeftArrowIcon} />
      </Link>
      <div class={styles.title}>META BNB</div>
      <div class={styles.card}>
        <div class={styles.cardTitle}>Login</div>
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
          <Link class={styles.forgotPassLink} href="/forgot-password">Forgot password?</Link>
        </div>
      </div>
      <div class={styles.signupHelper}>
        Don't have an account? <Link class={styles.signupLink} href="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
