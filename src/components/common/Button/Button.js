import { h } from 'preact';
import classnames from 'classnames';
import styles from './Button.scss';

export default function Button({ onClick, disabled, children, className }) {
  return (
    <button
      class={classnames([styles.root, className && className])}
      onClick={(e) => onClick(e)}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
