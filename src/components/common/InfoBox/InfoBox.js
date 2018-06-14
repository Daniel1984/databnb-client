import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './InfoBox.scss';

InfoBox.propTypes = {
  type: PropTypes.oneOf(['alert', 'success']),
  children: PropTypes.node.isRequired,
};

InfoBox.defaultProps = {
  type: 'alert',
};

export default function InfoBox({ type, children }) {
  return (
    <div className={classnames([styles.root, styles[type]])}>
      {children}
    </div>
  );
}
