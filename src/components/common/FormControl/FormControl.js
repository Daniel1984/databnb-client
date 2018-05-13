/* eslint jsx-a11y/label-has-for: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Label from '../Label/Label';
import styles from './FormControl.scss';

FormControl.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  vertical: PropTypes.bool,
  htmlFor: PropTypes.string,
};

FormControl.defaultProps = {
  label: '',
  htmlFor: '',
  vertical: true,
};

export default function FormControl({
  children, label, vertical, htmlFor,
}) {
  return (
    <div className={classnames([styles.root, vertical && styles.vertical])}>
      {(!!label && !!htmlFor) && (
        <Label htmlFor={htmlFor} vertical={vertical}>
          {label}
        </Label>
      )}
      <div className={styles.input}>
        {children}
      </div>
    </div>
  );
}
