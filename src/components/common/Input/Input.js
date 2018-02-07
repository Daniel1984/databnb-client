import { h } from 'preact';
import styles from './Input.scss';
import classnames from 'classnames'

export default function Input({ thickLines, type, onKeyUp, disabled = false, ...rest }) {
  return (
    <input
      type={type}
      class={classnames([styles.root, thickLines && styles.thickLines])}
      onKeyUp={(e) => onKeyUp(e)}
      disabled={disabled}
      {...rest}
    />
  )
}
