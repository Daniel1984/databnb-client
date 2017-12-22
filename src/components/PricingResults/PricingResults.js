import { h, Component } from 'preact';
import classnames from 'classnames';
import MapInfoBlock from '../MapInfoBlock/MapInfoBlock';
import QuickSummaryBlock from '../QuickSummaryBlock/QuickSummaryBlock';
import styles from './PricingResults.scss';

export default class PricingResults extends Component{
  componentWillReceiveProps() {
    this.rootEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  render() {
    const { latlng, listings, bedrooms, address } = this.props;
    return (
      <div ref={el => this.rootEl = el} class={classnames(styles.root, listings.length && styles.expanded)}>
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
}
