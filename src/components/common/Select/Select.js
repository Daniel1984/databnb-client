import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Select.scss';

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  vertical: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  children: PropTypes.node.isRequired,
  customStyles: PropTypes.string,
};

Select.defaultProps = {
  vertical: false,
  customStyles: '',
};

export default function Select({
  onChange,
  value,
  children,
  customStyles,
  vertical,
}) {
  return (
    <div className={classnames(styles.root, vertical && styles.vertical)}>
      <div className={styles.selectContainer}>
        <select
          className={classnames([styles.select, customStyles && customStyles])}
          value={value}
          onChange={onChange}
        >
          {children}
        </select>
      </div>
    </div>
  );
}
