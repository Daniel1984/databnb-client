import { h, Component } from 'preact';
import classnames from 'classnames'
import Map from '../Map/Map';
import styles from './MapInfoBlock.scss';
import LocationIcon from '../../assets/icons/location.svg';
import BedIcon from '../../assets/icons/bed3.svg';
import MinIncomeIcon from '../../assets/icons/graph-4.svg';
import MaxIncomeIcon from '../../assets/icons/graph-3.svg';

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
              Properties nearby: <strong class={styles.listingsCount}>{listings.length}</strong>
            </div>
            <div class={styles.subInfoRow}>
              <img class={styles.icon} src={LocationIcon} />
              <div class={styles.titleMuted}>{address}</div>
            </div>
            <div class={styles.subInfoRow}>
              <img class={styles.icon} src={BedIcon} />
              <div class={styles.titleMuted}>{bedroomsCount} bedroom</div>
            </div>
            <div class={styles.subInfoRow}>
              <img class={styles.icon} src={MaxIncomeIcon} />
              <div class={styles.titleMuted}>
                Highest rental price
                <strong class={styles.green}> {highestPrice} </strong>
                {currency}
              </div>
            </div>
            <div class={styles.subInfoRow}>
              <img class={styles.icon} src={MinIncomeIcon} />
              <div class={styles.titleMuted}>
                Lowest rental price
                <strong class={styles.red}> {lowestPrice} </strong>
                {currency}
              </div>
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
