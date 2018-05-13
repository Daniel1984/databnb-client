/* eslint jsx-a11y/label-has-for: 0 */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Label.scss';

Label.propTypes = {
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string,
  vertical: PropTypes.bool,
  noMargin: PropTypes.bool,
  capitalised: PropTypes.bool,
};

Label.defaultProps = {
  htmlFor: '',
  vertical: true,
  noMargin: false,
  capitalised: false,
};

export default function Label({
  children, htmlFor, vertical, noMargin, capitalised,
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={classnames([
        styles.root,
        vertical && styles.vertical,
        noMargin && styles.noMargin,
        capitalised && styles.capitalised,
      ])}
    >
      {children}
    </label>
  );
}
