import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Card.scss';

Card.propTypes = {
  title: PropTypes.string,
  flex: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Card.defaultProps = {
  flex: false,
  title: '',
};

export default function Card({ title, children, flex }) {
  return (
    <div className={classnames([styles.root, flex && styles.flex])}>
      {!!title && (
        <div className={styles.cardTitle}>
          {title}
        </div>
      )}
      {children}
    </div>
  );
}
