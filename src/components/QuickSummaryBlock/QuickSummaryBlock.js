import { h } from 'preact';
import styles from './QuickSummaryBlock.scss';

import {
  RatingChart,
  ListingsGrowthChart,
  PriceByDistanceChart,
  PriceByRatingChart,
  AvailabilityByPriceChart,
} from '../charts';

import Summary from '../common/Summary/Summary';

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

      <Summary
        title="Property availability percentage depending on price:"
        renderGraph={() => <AvailabilityByPriceChart listings={listings} />}
      />
    </div>
  );
}
