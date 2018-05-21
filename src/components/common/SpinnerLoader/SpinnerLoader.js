import React from 'react';
import classnames from 'classnames';
import styles from './SpinnerLoader.scss';

export default function SpinnerLoader() {
  return (
    <div className={styles.foldingCube}>
      <div className={classnames([styles.cube1, styles.cube])} />
      <div className={classnames([styles.cube2, styles.cube])} />
      <div className={classnames([styles.cube4, styles.cube])} />
      <div className={classnames([styles.cube3, styles.cube])} />
    </div>
  );
}
