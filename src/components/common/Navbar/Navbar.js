import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import LeftArrowIcon from '../../../assets/icons/left-arrow.svg';
import styles from './Navbar.scss';

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  goBack: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  children: undefined,
};

export default function Navbar({ title, children, goBack }) {
  return (
    <div className={styles.root}>
      <div className={styles.leftCta}>
        <Button kind="link" onClick={() => goBack()}>
          <img alt="Icon go back" className={styles.backIcon} src={LeftArrowIcon} />
        </Button>
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
