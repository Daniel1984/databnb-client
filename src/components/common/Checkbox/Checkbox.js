import { h } from 'preact';
import classnames from 'classnames';
import styles from './Checkbox.scss';

export default function Checkbox({ label, vertical = false, onChange }) {
  return (
    <div class={classnames(styles.root, vertical && styles.vertical)}>
      {label && (
        <div class={styles.label}>
          {label}
        </div>
      )}
      <label class={styles.switch}>
        <input
          type="checkbox"
          class={styles.checkbox}
          onChange={onChange}
        />
        <span class={styles.slider} />
      </label>
    </div>
  );
}
