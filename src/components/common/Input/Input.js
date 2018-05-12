import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Input.scss';

Input.propTypes = {
  thickLines: PropTypes.bool,
  type: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  thickLines: false,
};

export default function Input({ thickLines, type, ...rest }) {
  return (
    <Field
      type={type}
      className={classnames([styles.root, thickLines && styles.thickLines])}
      {...rest}
    />
  );
}
