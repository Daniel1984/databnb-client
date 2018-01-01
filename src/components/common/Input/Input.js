import { h } from 'preact';
import styles from './Input.scss';

export default function Input({ type, onKeyUp, placeholder, disabled = false, value }) {
  return (
    <input
      value={value}
      class={styles.root}
      onKeyUp={(e) => onKeyUp(e)}
      disabled={disabled}
      placeholder={placeholder}
    />
  )
}
