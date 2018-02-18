import React from 'react';
import HourGlassIcon from '../../assets/icons/hourglass.svg';
import TrophyIcon from '../../assets/icons/trophy.svg';
import MoneyBagIcon from '../../assets/icons/money-bag.svg';
import styles from './PlatformFeatures.scss';

function PlatformFeatures() {
  return (
    <div className={styles.root}>
      <div className={styles.column}>
        <img className={styles.icon} src={HourGlassIcon} />
        <div className={styles.msg}>
          Value your time! Let us handle the calculations
        </div>
      </div>
      <div className={styles.column}>
        <img className={styles.icon} src={TrophyIcon} />
        <div className={styles.msg}>
          Be the first to know when the market changes and adjust accordingly
        </div>
      </div>
      <div className={styles.column}>
        <img className={styles.icon} src={MoneyBagIcon} />
        <div className={styles.msg}>
          Increase your rental income in matter of days
        </div>
      </div>
    </div>
  );
}

export default PlatformFeatures;
