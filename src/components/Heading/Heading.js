import { h } from 'preact';
import { Link } from 'preact-router/match';
import styles from './Heading.scss';

function Heading() {
  return (
    <div class={styles.root}>
      <div class={styles.ctaContainer}>
        <Link href="/login" class={styles.loginBtn}>Login</Link>
        <Link href="/signup" class={styles.signupBtn}>Sign Up</Link>
      </div>
      <div class={styles.content}>
        <h1 class={styles.title}>META BNB</h1><br />
        <h2 class={styles.subtitle}>Increase your airbnb rental income</h2>
      </div>
    </div>
  );
}

export default Heading;
