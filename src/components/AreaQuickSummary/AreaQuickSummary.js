import React, { Component } from 'react';
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
      <div className={styles.root}>
        <div className={styles.summaryTitle}>
          Properties nearby: {listings.length || '--'}
        </div>
        <div className={styles.subInfoRow}>
          <img className={styles.icon} src={LocationIcon} />
          <div className={styles.titleMuted}>{address || '--'}</div>
        </div>
        <div className={styles.subInfoRow}>
          <img className={styles.icon} src={BedIcon} />
          <div className={styles.titleMuted}>Bedroom count {bedrooms.length ? getBedrooms(bedrooms) : '--'}</div>
        </div>
        <div className={styles.subInfoRow}>
          <img className={styles.icon} src={MaxIncomeIcon} />
          <div className={styles.titleMuted}>
            Highest daily rate
            <strong className={styles.green}> {highestPrice || '--'} </strong>
            {currency}
          </div>
        </div>
        <div className={styles.subInfoRow}>
          <img className={styles.icon} src={MinIncomeIcon} />
          <div className={styles.titleMuted}>
            Lowest daily rate
            <strong className={styles.red}> {lowestPrice || '--'} </strong>
            {currency}
          </div>
        </div>
        <div className={styles.subInfoRow}>
          <img className={styles.icon} src={AvgIncomeIcon} />
          <div className={styles.titleMuted}>
            Average daily rate
            <strong className={styles.green}> {avgPrice || '--'} </strong>
            {currency}
          </div>
        </div>
      </div>
    );
  }
}
