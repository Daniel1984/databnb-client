import React from 'react';
import classnames from 'classnames';
import styles from './Select.scss';

export default function Select({ onChange, value, children, customStyles, label, vertical = false }) {
  return (
    <div className={classnames(styles.root, vertical && styles.vertical)}>
      {label && (
        <div className={styles.label}>{label}</div>
      )}
      <div className={styles.selectContainer}>
        <select
          className={classnames([styles.select, customStyles && customStyles ])}
          value={value}
          onChange={onChange}
        >
          {children}
        </select>
      </div>
    </div>
  );
}
