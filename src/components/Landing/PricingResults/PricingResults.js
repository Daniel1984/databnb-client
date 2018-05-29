import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import QuickSummaryBlock from '../QuickSummaryBlock/QuickSummaryBlock';
import styles from './PricingResults.scss';

PricingResults.propTypes = {
  latlng: PropTypes.shape({}),
  listings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  address: PropTypes.string.isRequired,
};

PricingResults.defaultProps = {
  latlng: undefined,
};

export default function PricingResults({ latlng, listings, address }) {
  return (
    <div className={classnames(styles.root, listings.length && styles.expanded)}>
      {listings.length && (
        <QuickSummaryBlock
          listings={listings}
          latlng={latlng}
          address={address}
        />
      )}
    </div>
  );
}
