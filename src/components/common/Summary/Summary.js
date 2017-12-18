import { h } from 'preact';
import classnames from 'classnames';
import styles from './Summary.scss';

export default function Summary({ title, renderGraph }) {
  return (
    <div class={styles.root}>
      <div class={styles.col}>
        {renderGraph()}
      </div>
      <div class={classnames([styles.col, styles.info])}>
        <div class={styles.colTitle}>
          {title}
        </div>
      </div>
    </div>
  );
}
