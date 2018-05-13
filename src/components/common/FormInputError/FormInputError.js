import React from 'react';
import PropTypes from 'prop-types';
import styles from './FormInputError.scss';

FormInputError.propTypes = {
  children: PropTypes.node,
};

FormInputError.defaultProps = {
  children: null,
};

export default function FormInputError({ children }) {
  if (children) {
    return (
      <div className={styles.root}>
        {children}
      </div>
    );
  }

  return null;
}
