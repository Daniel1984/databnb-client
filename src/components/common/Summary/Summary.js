import React from 'react';
import classnames from 'classnames';
import styles from './Summary.scss';

export default function Summary({ title, renderGraph }) {
  return (
    <div className={styles.root}>
      <div className={styles.col}>
        {renderGraph()}
      </div>
      <div className={classnames([styles.col, styles.info])}>
        <div className={styles.colTitle}>
          {title}
        </div>
      </div>
    </div>
  );
}
