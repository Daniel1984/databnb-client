import { h, Component } from 'preact';
import classnames from 'classnames';
import styles from './PricingBlock.scss';
import { Checkbox } from '../common';

class PricingBlock extends Component {
  state = {
    yearly: false,
  };

  render() {
    const { yearly } = this.state;

    return (
      <div class={styles.root}>
        <div class={styles.title}>Plans and Pricing</div>
        <div class={styles.subTitle}>Billed {yearly ? 'Yearly' : 'Monthly' }</div>

        <div class={styles.checkbox}>
          <Checkbox
            label="Month / Year"
            onChange={e => this.setState({ yearly: e.target.checked })}
          />
        </div>

        <div class={styles.pricingContainer}>
          <div class={styles.pricingBlock}>
            <div class={styles.heading}>
              <div class={styles.pricingTitle}>Free</div>
              <div class={styles.cost}>$0</div>
            </div>
            <div class={styles.features}>
              <div class={styles.featuresTitle}>
                Features:
              </div>
              <div class={styles.feature}>
                Access to custom charts
              </div>
              <div class={styles.feature}>
                Unlimited queries
              </div>
            </div>
          </div>

          <div class={styles.pricingBlock}>
            <div class={classnames([styles.heading, styles.basicList])}>
              <div class={classnames([styles.pricingTitle, styles.popularTile])}>
                Basic
              </div>
              <div class={classnames([styles.cost, styles.popularCost])}>
                {yearly ? '$100' : '$10' }
              </div>
            </div>
            <div class={styles.features}>
              <div class={styles.featuresTitle}>
                Features:
              </div>
              <div class={styles.feature}>
                Weekly personalized email reports
              </div>
              <div class={styles.feature}>
                Weekly pricing recommendations
              </div>
              <div class={styles.feature}>
                All free plan features
              </div>
            </div>
          </div>

          <div class={styles.pricingBlock}>
            <div class={styles.heading}>
              <div class={styles.pricingTitle}>Pro</div>
              <div class={styles.cost}>$20</div>
            </div>
            <div class={styles.features}>
              <div class={styles.featuresTitle}>
                Features:
              </div>
              <div class={styles.feature}>
                All basic features
              </div>
              <div class={styles.feature}>
                More custom dashboards
              </div>
              <div class={styles.feature}>
                Download CSV/JSON data
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PricingBlock;
