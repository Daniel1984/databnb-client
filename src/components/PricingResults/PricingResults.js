import { h } from 'preact';
import classnames from 'classnames';
import MapInfoBlock from '../MapInfoBlock/MapInfoBlock';
import QuickSummaryBlock from '../QuickSummaryBlock/QuickSummaryBlock';
import styles from './PricingResults.scss';

export default function PricingResults({ latlng, listings, bedrooms, address }) {
  return (
    <div class={classnames(styles.root, listings.length && styles.expanded)}>
      <MapInfoBlock
        latlng={latlng}
        listings={listings}
        bedrooms={bedrooms}
        address={address}
      />
      {listings.length && (
        <QuickSummaryBlock listings={listings} latlng={latlng} />
      )}
    </div>
  );
}
