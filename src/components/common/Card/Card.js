import { h } from 'preact';
import styles from './Card.scss';

export default function Card({ title, children }) {
  return (
    <div class={styles.root}>
      <div class={styles.cardTitle}>{title}</div>
      {children}
    </div>
  );
}
