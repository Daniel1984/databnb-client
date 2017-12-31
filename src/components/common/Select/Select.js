import { h } from 'preact';
import classnames from 'classnames';
import styles from './Select.scss';

export default function Select({ onChange, value, children, customStyles, label, vertical = false }) {
  return (
    <div class={classnames(styles.root, vertical && styles.vertical)}>
      {label && (
        <div class={styles.label}>{label}</div>
      )}
      <div class={styles.selectContainer}>
        <select
          class={classnames([styles.select, customStyles && customStyles ])}
          value={value}
          onChange={onChange}
        >
          {children}
        </select>
      </div>
    </div>
  );
}
