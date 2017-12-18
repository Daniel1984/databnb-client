import { h } from 'preact';
import styles from './QuickSummaryBlock.scss';
import AvailabilityByPriceSummary from '../AvailabilityByPriceSummary/AvailabilityByPriceSummary';
import AvailabilityByRatingSummary from '../AvailabilityByRatingSummary/AvailabilityByRatingSummary';

import {
  RatingChart,
  ListingsGrowthChart,
  PriceByDistanceChart,
  PriceByRatingChart,
} from '../charts';

import { Summary } from '../common';

export default function QuickSummaryBlock({ listings, latlng }) {
  return (
    <div>
      <div class={styles.quickSummaryTitle}>
        Quick summary (data from last 6 months)
      </div>
      <Summary
        title="Listings by rating:"
        renderGraph={() => <RatingChart listings={listings} />}
      />

      <Summary
        title="Listings growth in area:"
        renderGraph={() => <ListingsGrowthChart listings={listings} />}
      />

      <Summary
        title="Average monthly rental price depending on the distance from your address:"
        renderGraph={() => <PriceByDistanceChart listings={listings} latlng={latlng} />}
      />

      <Summary
        title="Average monthly rental price depenfing on rating:"
        renderGraph={() => <PriceByRatingChart listings={listings} />}
      />

      <AvailabilityByPriceSummary listings={listings} />

      <AvailabilityByRatingSummary listings={listings} />
    </div>
  );
}
