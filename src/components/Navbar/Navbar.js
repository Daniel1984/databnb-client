import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.scss';
import LeftArrowIcon from '../../assets/icons/left-arrow.svg';

export default function SettingsPageContainer({ backTo, title, children }) {
  return (
    <div className={styles.root}>
      <div className={styles.leftCta}>
        <Link to={backTo}>
          <img className={styles.backIcon} src={LeftArrowIcon} />
        </Link>
      </div>

      <div className={styles.midSection}>
        <div className={styles.title}>{title}</div>
      </div>

      <div className={styles.rightCta}>
        {children}
      </div>
    </div>
  );
}
