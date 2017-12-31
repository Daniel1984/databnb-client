import { h, Component } from 'preact';
import classnames from 'classnames'
import Map from '../Map/Map';
import styles from './MapInfoBlock.scss';

export default class MapInfoBlock extends Component {
  componentWillReceiveProps({ listings }) {
    const { prices, currency } = listings.reduce((acc, { currentMonthPrice, currency }) => {
      acc.prices = [...acc.prices, currentMonthPrice],
      acc.currency = currency;
      return acc;
    }, { prices: [] });

    const sortedPrices = prices.sort((a, b) => a - b);
    const highestPrice = sortedPrices.pop();
    const lowestPrice = sortedPrices.shift();

    this.setState({
      highestPrice,
      lowestPrice,
      currency,
    });
  }

  render() {
    const { listings, latlng, address } = this.props;
    const bedroomsCount = listings.length ? listings[0].bedrooms : 0;
    const { highestPrice, lowestPrice, currency } = this.state;

    return (
      <div class={styles.root}>
        <div class={classnames([styles.col, styles.info])}>
          <div class={styles.infoContent}>
            <div class={styles.summaryTitle}>
              Properties nearby: <strong class={styles.listingsCount}>{listings.length}</strong> ({bedroomsCount} bedroom)
            </div>
            <div class={styles.summarySubitle}>{address}</div>
            <div class={styles.summaryTitle}>
              Rental prices vary between
              <strong class={styles.listingsCount}> {lowestPrice}</strong> and
              <strong class={styles.listingsCount}> {highestPrice}</strong> {currency}
            </div>
          </div>
        </div>
        <div class={classnames([styles.col, styles.map])}>
          <Map latlng={latlng} listings={listings} />
        </div>
      </div>
    );
  }
}
