import React from 'react';
import PropTypes from 'prop-types';
import { SettingsPageContainer, Navbar } from '../../components/common';
import styles from './Property.scss';

// Property.propTypes = {
//   propertyId: PropTypes.string.isRequired,
// };

export default function Property({ propertyId }) {
  console.log('gt hete')
  return (
    <SettingsPageContainer>
      <Navbar title="Property" />
      <div>property</div>
    </SettingsPageContainer>
  );
}
