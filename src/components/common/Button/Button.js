import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Button.scss';

Button.propTypes = {
  kind: PropTypes.oneOf(['success', 'danger', 'default', 'link']),
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  kind: 'default',
};

export default function Button({ kind, children, ...rest }) {
  return (
    <button
      className={classnames([styles.root, styles[kind]])}
      {...rest}
    >
      {children}
    </button>
  );
}
