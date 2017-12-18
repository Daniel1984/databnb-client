import { h } from 'preact';
import classnames from 'classnames'
import Map from '../Map/Map';
import styles from './MapInfoBlock.scss';

export default function MapInfoBlock({ listings, latlng, bedrooms, address }) {
  const bedroomsCount = listings.length ? listings[0].bedrooms : 0;

  return (
    <div class={styles.row}>
      <div class={styles.col}>
        <div>
          <h2 class={styles.summaryTitle}>
            Properties nearby: <strong class={styles.listingsCount}>{listings.length}</strong> ({bedroomsCount} bedroom)
          </h2>
          <h3 class={styles.summarySubitle}>{address}</h3>
        </div>
      </div>
      <div class={classnames([styles.col, styles.map])}>
        <Map latlng={latlng} listings={listings} bedrooms={bedrooms} />
      </div>
    </div>
  );
}
