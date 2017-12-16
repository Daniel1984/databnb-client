import { h } from 'preact';
import Map from '../Map/Map';
import styles from './MapInfoBlock.scss';

export default function MapInfoBlock({ listings, latlng, bedrooms, address }) {
  const bedroomsCount = listings.length ? listings[0].bedrooms : 0;

  return (
    <div class={styles.row}>
      <div class={styles.col}>
        <h2 class={styles.summaryTitle}>
          Properties nearby: <strong class={styles.listingsCount}>{listings.length}</strong> ({bedroomsCount} bedroom)
        </h2>
        <h3 class={styles.summarySubitle}>{address}</h3>
      </div>
      <div class={styles.col}>
        <Map latlng={latlng} listings={listings} bedrooms={bedrooms} />
      </div>
    </div>
  );
}