import { h } from 'preact';
import HourGlassIcon from '../../assets/icons/hourglass.svg';
import TrophyIcon from '../../assets/icons/trophy.svg';
import MoneyBagIcon from '../../assets/icons/money-bag.svg';
import styles from './PlatformFeatures.scss';

function PlatformFeatures() {
  return (
    <div class={styles.root}>
      <div class={styles.column}>
        <img class={styles.icon} src={HourGlassIcon} />
        <div class={styles.msg}>
          Value your time! Let us handle the calculations
        </div>
      </div>
      <div class={styles.column}>
        <img class={styles.icon} src={TrophyIcon} />
        <div class={styles.msg}>
          Be the first to know when the market changes and adjust accordingly
        </div>
      </div>
      <div class={styles.column}>
        <img class={styles.icon} src={MoneyBagIcon} />
        <div class={styles.msg}>
          Increase your rental income in matter of days
        </div>
      </div>
    </div>
  );
}

export default PlatformFeatures;
