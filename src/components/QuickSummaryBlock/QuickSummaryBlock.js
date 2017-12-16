import { h } from 'preact';
import styles from './QuickSummaryBlock.scss';

import {
  RatingChart,
  ListingsGrowthChart,
  PriceByDistanceChart,
  PriceByRatingChart,
  AvailabilityByPriceChart,
} from '../charts';

export default function QuickSummaryBlock({ listings, latlng }) {
  return (
    <div>
      <div class={styles.quickSummaryTitle}>Quick summary (data from last 6 months)</div>
      <div class={styles.row}>
        <div class={styles.col}>
          <div class={styles.colTitle}>
            Listings by rating:
          </div>
          <RatingChart listings={listings} />
        </div>
        <div class={styles.col}>
          <div class={styles.colTitle}>
            Listings growth in area:
          </div>
          <ListingsGrowthChart listings={listings} />
        </div>
      </div>

      <div class={styles.row}>
        <div class={styles.col}>
          <div class={styles.colTitle}>
            Avg monthly rental price by distance:
          </div>
          <PriceByDistanceChart listings={listings} latlng={latlng} />
        </div>
        <div class={styles.col}>
          <div class={styles.colTitle}>
            Avg monthly rental price depenfing on rating:
          </div>
          <PriceByRatingChart listings={listings} />
        </div>
      </div>

      <div class={styles.row}>
        <AvailabilityByPriceChart listings={listings} />
      </div>
    </div>
  );
}
