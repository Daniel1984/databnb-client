import React from 'react';
import styles from './About.scss';

export default function About() {
  return (
    <div className={styles.root}>
      <h1 className={styles.message}>
        Metabnb rent estimate is based on huge database of records to accuratly predict rental prices.
        Our calculator will help you increase your income whether you are a property manager or an individual host.
      </h1>
    </div>
  );
}
