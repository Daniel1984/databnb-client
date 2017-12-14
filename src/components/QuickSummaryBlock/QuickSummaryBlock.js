import { h } from 'preact';
import styles from './QuickSummaryBlock.scss';
import RatingChart from '../RatingChart/RatingChart';
import ListingsGrowthChart from '../ListingsGrowthChart/ListingsGrowthChart';
import PriceByDistanceChart from '../PriceByDistanceChart/PriceByDistanceChart';

export default function QuickSummaryBlock({ listings, latlng, address }) {
  console.log(listings);
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
            Avg monthly rental price distribution by distance from <i class={styles.address}>{address}</i> (data from last 4 months)
          </div>
          <PriceByDistanceChart listings={listings} latlng={latlng} address={address} />
        </div>
        <div class={styles.col}>
          <div class={styles.colTitle}>
            Price difference depenfing on property rating:
          </div>
        </div>
      </div>
    </div>
  );
}
