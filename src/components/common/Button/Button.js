import React from 'react';
import classnames from 'classnames';
import styles from './Button.scss';

export default function Button({ onClick, children, danger, success, regular, block, lg, ...rest }) {
  return (
    <button
      className={classnames([
        styles.root,
        danger && styles.danger,
        success && styles.success,
        block && styles.block,
        lg && styles.large,
        regular && styles.regular
      ])}
      onClick={(e) => onClick(e)}
      {...rest}
    >
      {children}
    </button>
  )
}
