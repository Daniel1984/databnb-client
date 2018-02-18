import React from 'react';
import classnames from 'classnames';
import styles from './Checkbox.scss';

export default function Checkbox({ label, vertical = false, onChange }) {
  return (
    <div className={classnames(styles.root, vertical && styles.vertical)}>
      {label && (
        <div className={styles.label}>
          {label}
        </div>
      )}
      <label className={styles.switch}>
        <input
          type="checkbox"
          className={styles.checkbox}
          onChange={onChange}
        />
        <span className={styles.slider} />
      </label>
    </div>
  );
}
