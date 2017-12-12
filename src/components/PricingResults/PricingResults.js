import { h } from 'preact';
import classnames from 'classnames';
import Map from '../Map/Map';
import styles from './PricingResults.scss';

export default function PricingResults({ latlng, listings, bedrooms, address }) {
  const bedroomsCount = listings.length ? listings[0].bedrooms : 0;

  return (
    <div class={classnames(styles.root, listings.length && styles.expanded)}>
      <div class={styles.mapRow}>
        <div class={styles.mapRowCol}>
          <h2 class={styles.summaryTitle}>
            Properties nearby: <strong class={styles.listingsCount}>{listings.length}</strong> ({bedroomsCount} bedroom)
          </h2>
          <h3 class={styles.summarySubitle}>
            {address}
          </h3>
        </div>
        <div class={styles.mapRowCol}>
          <Map latlng={latlng} listings={listings} bedrooms={bedrooms} />
        </div>
      </div>
    </div>
  )
}
