import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Button.scss';

export default class Button extends PureComponent {
  static propTypes = {
    kind: PropTypes.oneOf(['success', 'danger', 'default', 'link', 'info']),
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    kind: 'default',
    className: '',
  };

  render() {
    const {
      kind,
      className,
      children,
      ...rest
    } = this.props;

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
}
