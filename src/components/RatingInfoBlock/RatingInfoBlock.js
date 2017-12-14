import { h } from 'preact';
import RatingChart from '../RatingChart/RatingChart';
import styles from './RatingInfoBlock.scss';
import ListingsGrowthChart from '../ListingsGrowthChart/ListingsGrowthChart';

export default function RatingInfoBlock({ listings }) {
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
            AirBnB listings growth:
          </div>
          <ListingsGrowthChart listings={listings} />
        </div>
      </div>
    </div>
  );
}
