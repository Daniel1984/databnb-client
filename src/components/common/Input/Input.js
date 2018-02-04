import { h } from 'preact';
import styles from './Input.scss';
import classnames from 'classnames'

export default function Input({ thickLines, type, onKeyUp, placeholder, disabled = false, value }) {
  return (
    <input
      value={value}
      class={classnames([styles.root, thickLines && styles.thickLines])}
      onKeyUp={(e) => onKeyUp(e)}
      disabled={disabled}
      placeholder={placeholder}
    />
  )
}
