import React, { Component } from 'react';
import classnames from 'classnames';
import { FancyCheckbox } from '../common';
import Subscribe from '../Subscribe/Subscribe';
import styles from './PricingBlock.scss';

class PricingBlock extends Component {
  state = {
    yearly: false,
  };

  render() {
    const { yearly } = this.state;

    return (
      <div className={styles.root}>
        <div className={styles.title}>Plans and Pricing</div>
        <div className={styles.subTitle}>Billed {yearly ? 'Yearly' : 'Monthly' }</div>

        <div className={styles.checkbox}>
          <FancyCheckbox
            htmlFor="pricing-plan"
            label="Month / Year"
            onChange={e => this.setState({ yearly: e.target.checked })}
          />
        </div>

        <div className={styles.pricingContainer}>
          <div className={styles.pricingBlock}>
            <div className={styles.heading}>
              <div className={styles.pricingTitle}>Free</div>
              <div className={styles.cost}>$0</div>
            </div>
            <div className={styles.features}>
              <div className={styles.featuresTitle}>
                Features:
              </div>
              <div className={styles.feature}>
                Access to custom charts
              </div>
              <div className={styles.feature}>
                Unlimited queries
              </div>
            </div>
          </div>

          <div className={styles.pricingBlock}>
            <div className={classnames([styles.heading, styles.basicList])}>
              <div className={classnames([styles.pricingTitle, styles.popularTile])}>
                Basic
              </div>
              <div className={classnames([styles.cost, styles.popularCost])}>
                {yearly ? '$100' : '$10' }
              </div>
            </div>
            <div className={styles.features}>
              <div className={styles.featuresTitle}>
                Features:
              </div>
              <div className={styles.feature}>
                Weekly personalized email reports
              </div>
              <div className={styles.feature}>
                Weekly pricing recommendations
              </div>
              <div className={styles.feature}>
                All free plan features
              </div>
            </div>
          </div>

          <div className={styles.pricingBlock}>
            <div className={styles.heading}>
              <div className={styles.pricingTitle}>Pro</div>
              <div className={styles.cost}>Subscribe to find out more</div>
            </div>
            <div className={styles.features}>
              <div className={styles.featuresTitle}>
                Features:
              </div>
              <div className={styles.feature}>
                All basic features
              </div>
              <div className={styles.feature}>
                API access
              </div>
              <div className={styles.feature}>
                Download CSV/JSON data
              </div>
            </div>
          </div>
        </div>
        <Subscribe />
      </div>
    );
  }
}

export default PricingBlock;
