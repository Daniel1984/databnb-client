import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Summary.scss';

Summary.propTypes = {
  title: PropTypes.string.isRequired,
  renderGraph: PropTypes.func.isRequired,
};

export default function Summary({ title, renderGraph }) {
  return (
    <div className={styles.root}>
      <div className={styles.col}>
        {renderGraph()}
      </div>
      <div className={classnames([styles.col, styles.info])}>
        <div className={styles.colTitle}>
          {title}
        </div>
      </div>
    </div>
  );
}
