import { h } from 'preact';
import styles from './Heading.scss';

function Heading() {
  return (
    <div class={styles.root}>
      <div class={styles.backdrop}></div>
      <div class={styles.content}>
        <h1 class={styles.title}>META BNB</h1><br />
        <h2 class={styles.subtitle}>Increase your airbnb rental income</h2>
      </div>
    </div>
  );
}

export default Heading;
