import React from 'react';
import PropTypes from 'prop-types';
import Settings from '../Settings/Settings';
import { Card } from '../common';
import ToolsIcon from '../../assets/icons/tools.svg';
import styles from './Billing.scss';

Billing.propTypes = {
  user: PropTypes.shape({}).isRequired,
};

export default function Billing({ user }) {
  return (
    <Settings user={user}>
      <Card flex>
        <img alt="Tools icon" className={styles.icon} src={ToolsIcon} />
      </Card>
    </Settings>
  );
}
