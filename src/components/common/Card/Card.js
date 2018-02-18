import React from 'react';
import classnames from 'classnames';
import styles from './Card.scss';

export default function Card({ title, children, flex }) {
  return (
    <div className={classnames([styles.root, flex && styles.flex])}>
      {!!title && (
        <div className={styles.cardTitle}>{title}</div>
      )}
      {children}
    </div>
  );
}
