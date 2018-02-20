import React from 'react';
import classnames from 'classnames';
import styles from './FormControl.scss';

export default function FormControl({ children, label, vertical }) {
  return (
    <div className={classnames([styles.root, vertical && styles.vertical])}>
      {!!label && (
        <div className={styles.labelContainer}>
          {label}
        </div>
      )}
      <div className={styles.input}>
        {children}
      </div>
    </div>
  )
}
