import React from 'react';
import styles from './Input.scss';
import classnames from 'classnames'

export default function Input({ thickLines, type, onChange, disabled = false, ...rest }) {
  return (
    <input
      type={type}
      className={classnames([styles.root, thickLines && styles.thickLines])}
      onChange={onChange}
      disabled={disabled}
      {...rest}
    />
  )
}
