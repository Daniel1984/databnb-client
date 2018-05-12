import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './RawInput.scss';

RawInput.propTypes = {
  thickLines: PropTypes.bool,
};

RawInput.defaultProps = {
  thickLines: false,
};

export default function RawInput({ thickLines, ...rest }) {
  return (
    <input
      className={classnames([styles.root, thickLines && styles.thickLines])}
      {...rest}
    />
  );
}
