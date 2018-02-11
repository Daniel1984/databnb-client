import { h, Component } from 'preact';
import classnames from 'classnames'
import Map from '../Map/Map';
import styles from './AreaQuickSummary.scss';
import LocationIcon from '../../assets/icons/location.svg';
import BedIcon from '../../assets/icons/bed3.svg';
import MinIncomeIcon from '../../assets/icons/graph-4.svg';
import AvgIncomeIcon from '../../assets/icons/graph-5.svg';
import MaxIncomeIcon from '../../assets/icons/graph-3.svg';

function getBedrooms(bedrooms) {
  return bedrooms.sort().map((bedroom, i) => {
    return `${!bedroom ? 'studio' : bedroom}${i !== bedrooms.length - 1 ? ', ' : ''}`
  });
}

export default class AreaQuickSummary extends Component {
  componentDidMount() {
    this.updateQuickInfo(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.updateQuickInfo(newProps);
  }

  updateQuickInfo({ listings }) {
    const { prices, currency, bedrooms } = listings.reduce((acc, { currentDayPrice, currency, bedrooms }) => {
      acc.prices = [...acc.prices, currentDayPrice],
      acc.currency = currency;

      if (acc.bedrooms.indexOf(bedrooms) === -1) {
        acc.bedrooms = [...acc.bedrooms, bedrooms];
      }

      return acc;
    }, { prices: [], bedrooms: [] });

    const avgPrice = prices.length ? Math.ceil((prices || []).reduce((a, b) => a + b) / prices.length) : 0;
    const sortedPrices = prices.sort((a, b) => a - b);
    const highestPrice = sortedPrices.pop();
    const lowestPrice = sortedPrices.shift();

    this.setState({
      highestPrice,
      lowestPrice,
      avgPrice,
      currency,
      bedrooms,
    });
  }

  render() {
    const { listings, address } = this.props;
    const { highestPrice, lowestPrice, avgPrice, currency, bedrooms = [] } = this.state;

    return (
      <div class={styles.root}>
        <div class={styles.summaryTitle}>
          Properties nearby: {listings.length || '--'}
        </div>
        <div class={styles.subInfoRow}>
          <img class={styles.icon} src={LocationIcon} />
          <div class={styles.titleMuted}>{address || '--'}</div>
        </div>
        <div class={styles.subInfoRow}>
          <img class={styles.icon} src={BedIcon} />
          <div class={styles.titleMuted}>Bedroom count {bedrooms.length ? getBedrooms(bedrooms) : '--'}</div>
        </div>
        <div class={styles.subInfoRow}>
          <img class={styles.icon} src={MaxIncomeIcon} />
          <div class={styles.titleMuted}>
            Highest daily rate
            <strong class={styles.green}> {highestPrice || '--'} </strong>
            {currency}
          </div>
        </div>
        <div class={styles.subInfoRow}>
          <img class={styles.icon} src={MinIncomeIcon} />
          <div class={styles.titleMuted}>
            Lowest daily rate
            <strong class={styles.red}> {lowestPrice || '--'} </strong>
            {currency}
          </div>
        </div>
        <div class={styles.subInfoRow}>
          <img class={styles.icon} src={AvgIncomeIcon} />
          <div class={styles.titleMuted}>
            Average daily rate
            <strong class={styles.green}> {avgPrice || '--'} </strong>
            {currency}
          </div>
        </div>
      </div>
    );
  }
}
