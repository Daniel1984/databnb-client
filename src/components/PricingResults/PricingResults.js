import { h } from 'preact';
import classnames from 'classnames';
import QuickSummaryBlock from '../QuickSummaryBlock/QuickSummaryBlock';
import styles from './PricingResults.scss';

export default function PricingResults({ latlng, listings, address }) {
  return (
    <div class={classnames(styles.root, listings.length && styles.expanded)}>
      {listings.length && (
        <QuickSummaryBlock
          listings={listings}
          latlng={latlng}
          address={address}
        />
      )}
    </div>
  );
}
