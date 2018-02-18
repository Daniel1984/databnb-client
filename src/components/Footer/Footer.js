import React from 'react';
import styles from './Footer.scss';

function Footer() {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        © 2017 All rights reserved metabnb.com
      </div>
    </div>
  );
}

export default Footer;
