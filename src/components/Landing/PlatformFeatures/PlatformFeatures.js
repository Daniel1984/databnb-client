import React from 'react';
import HourGlassIcon from '../../../assets/icons/hourglass.svg';
import TrophyIcon from '../../../assets/icons/trophy.svg';
import MoneyBagIcon from '../../../assets/icons/money-bag.svg';
import styles from './PlatformFeatures.scss';

const content = [
  {
    Icon: HourGlassIcon,
    alt: 'Sand watch icon',
    msg: 'Value your time! Let us handle the calculations',
  },
  {
    Icon: TrophyIcon,
    alt: 'Trophy icon',
    msg: 'Be the first to know when the market changes and adjust accordingly',
  },
  {
    Icon: MoneyBagIcon,
    alt: 'Money bag icon',
    msg: 'Increase your rental income in matter of days',
  },
];

export default function PlatformFeatures() {
  return (
    <div className={styles.root}>
      {content.map(({ alt, Icon, msg }) => (
        <div className={styles.column} key={alt}>
          <img alt={alt} className={styles.icon} src={Icon} />
          <div className={styles.msg}>
            {msg}
          </div>
        </div>
      ))}
    </div>
  );
}
