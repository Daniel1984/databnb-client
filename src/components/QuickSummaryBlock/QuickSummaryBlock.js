import { h } from 'preact';
import styles from './QuickSummaryBlock.scss';

import {
  RatingChart,
  ListingsGrowthChart,
  PriceByDistanceChart,
  PriceByRatingChart,
} from '../charts';

export default function QuickSummaryBlock({ listings, latlng, address }) {
  return (
    <div>
      <div class={styles.quickSummaryTitle}>Quick summary</div>
      <div class={styles.row}>
        <div class={styles.col}>
          <div class={styles.colTitle}>
            Distribution by rating:
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
            Avg monthly rental price distribution by distance from <i class={styles.address}>{address}</i> (data from last 6 months)
          </div>
          <PriceByDistanceChart listings={listings} latlng={latlng} />
        </div>
        <div class={styles.col}>
          <div class={styles.colTitle}>
            Avg monthly rental price depenfing on property rating (data from last 6 months):
          </div>
          <PriceByRatingChart listings={listings} />
        </div>
      </div>
    </div>
  );
}
