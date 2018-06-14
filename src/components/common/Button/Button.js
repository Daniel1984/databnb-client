import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Button.scss';

Button.propTypes = {
  kind: PropTypes.oneOf(['success', 'danger', 'default', 'link', 'info']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  kind: 'default',
  className: '',
};

export default function Button({
  kind,
  className,
  children,
  ...rest
}) {
  return (
    <button
      className={classnames([
        styles.root,
        styles[kind],
        className && className,
      ])}
      {...rest}
    >
      {children}
    </button>
  );
}
