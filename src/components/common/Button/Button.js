import { h } from 'preact';
import styles from './Button.scss';

export default function Button({ onClick, btnText, disabled }) {
  return (
    <button
      class={styles.root}
      onClick={(e) => onClick(e)}
      disabled={disabled}
    >
      {btnText}
    </button>
  )
}
