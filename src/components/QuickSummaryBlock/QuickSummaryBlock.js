import { h } from 'preact';
import classnames from 'classnames';
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
      <div class={styles.quickSummaryTitle}>
        Quick summary (data from last 6 months)
      </div>
      <div class={styles.row}>
        <div class={styles.col}>
          <RatingChart listings={listings} />
        </div>
        <div class={classnames([styles.col, styles.info])}>
          <div class={styles.colTitle}>
            Listings by rating:
          </div>
        </div>
      </div>

      <div class={styles.row}>
        <div class={classnames([styles.col, styles.info])}>
          <div class={styles.colTitle}>
            Listings growth in area:
          </div>
        </div>
        <div class={styles.col}>
          <ListingsGrowthChart listings={listings} />
        </div>
      </div>

      <div class={styles.row}>
        <div class={styles.col}>
          <PriceByDistanceChart listings={listings} latlng={latlng} />
        </div>
        <div class={classnames([styles.col, styles.info])}>
          <div class={styles.colTitle}>
            Avg monthly rental price by distance:
          </div>
        </div>
      </div>

      <div class={styles.row}>
        <div class={classnames([styles.col, styles.info])}>
          <div class={styles.colTitle}>
            Avg monthly rental price depenfing on rating:
          </div>
        </div>
        <div class={styles.col}>
          <PriceByRatingChart listings={listings} />
        </div>
      </div>

      <div class={styles.row}>
        <div class={styles.col}>
          <AvailabilityByPriceChart listings={listings} />
        </div>
        <div class={classnames([styles.col, styles.info])}>
          <div class={styles.colTitle}>
            Property availability (percentage / pricing)
          </div>
        </div>
      </div>
    </div>
  );
}
