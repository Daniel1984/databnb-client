import React from 'react';
import PropTypes from 'prop-types';
import AvailabilityByRatingSummary from '../AvailabilityByRatingSummary/AvailabilityByRatingSummary';
import PriceByDateSummary from '../PriceByDateSummary/PriceByDateSummary';
import {
  RatingChart,
  ListingsGrowthChart,
  PriceByRatingChart,
} from '../../charts';
import { Summary } from '../../common';
import styles from './QuickSummaryBlock.scss';

QuickSummaryBlock.propTypes = {
  listings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default function QuickSummaryBlock({ listings }) {
  return (
    <div>
      <div className={styles.quickSummaryTitle}>
        Quick summary
      </div>

      <PriceByDateSummary listings={listings} />

      <AvailabilityByRatingSummary listings={listings} />

      <Summary
        title="Listings by rating:"
        renderGraph={() => <RatingChart listings={listings} />}
      />

      <Summary
        title="Listings growth in area:"
        renderGraph={() => <ListingsGrowthChart listings={listings} />}
      />

      <Summary
        title="Average monthly rental price depending on rating:"
        renderGraph={() => <PriceByRatingChart listings={listings} />}
      />
    </div>
  );
}
