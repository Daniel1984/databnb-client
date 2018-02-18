import React from 'react';
import classnames from 'classnames';
import styles from './Button.scss';

export default function Button({ onClick, children, success, block, lg, ...rest }) {
  return (
    <button
      className={classnames([
        styles.root,
        success && styles.success,
        block && styles.block,
        lg && styles.large
      ])}
      onClick={(e) => onClick(e)}
      {...rest}
    >
      {children}
    </button>
  )
}
