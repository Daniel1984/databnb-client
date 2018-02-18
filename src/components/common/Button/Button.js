import React from 'react';
import classnames from 'classnames';
import styles from './Button.scss';

export default function Button({ onClick, disabled, children, className, type }) {
  return (
    <button
      type={type}
      className={classnames([styles.root, className && className])}
      onClick={(e) => onClick(e)}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
