import { h } from 'preact';
import styles from './Footer.scss';

function Footer() {
  return (
    <div class={styles.root}>
      <div class={styles.content}>
        © 2017 All rights reserved metabnb.com
      </div>
    </div>
  );
}

export default Footer;
