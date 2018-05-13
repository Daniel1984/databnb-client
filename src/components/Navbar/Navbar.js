import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LeftArrowIcon from '../../assets/icons/left-arrow.svg';
import styles from './Navbar.scss';

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default function Navbar({ title, children }) {
  return (
    <div className={styles.root}>
      <div className={styles.leftCta}>
        <Link to="/">
          <img alt="Icon go back" className={styles.backIcon} src={LeftArrowIcon} />
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
