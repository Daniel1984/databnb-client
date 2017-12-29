import { h } from 'preact';
import styles from './QuickSummaryBlock.scss';
import AvailabilityByPriceSummary from '../AvailabilityByPriceSummary/AvailabilityByPriceSummary';
import AvailabilityByRatingSummary from '../AvailabilityByRatingSummary/AvailabilityByRatingSummary';
import PriceByDateSummary from '../PriceByDateSummary/PriceByDateSummary';
import HeatMap from '../HeatMap/HeatMap';

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

      <AvailabilityByPriceSummary listings={listings} />

      <Summary
        title="Average monthly rental price depending on rating:"
        renderGraph={() => <PriceByRatingChart listings={listings} />}
      />

      <Summary
        title="Average monthly rental price depending on the distance from your address:"
        renderGraph={() => <PriceByDistanceChart listings={listings} latlng={latlng} />}
      />

      <HeatMap latlng={latlng} />
    </div>
  );
}
