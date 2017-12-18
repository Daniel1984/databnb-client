import { h } from 'preact';
import classnames from 'classnames';
import styles from './Select.scss';

export default function Select({ onChange, value, children, customStyles }) {
  return (
    <div class={styles.customSelect}>
      <select
        class={classnames([styles.select, customStyles && customStyles ])}
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
    </div>
  );
}
