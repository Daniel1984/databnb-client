import { h } from 'preact';
import classnames from 'classnames';
import styles from './PricingBlock.scss';

function PricingBlock() {
  return (
    <div class={styles.root}>
      <div class={styles.title}>Plans and Pricing</div>
      <div class={styles.subTitle}>Billed Monthly</div>

      <div class={styles.pricingContainer}>
        <div class={styles.pricingBlock}>
          <div class={styles.heading}>
            <div>
              <div class={styles.pricingTitle}>Free</div>
              <div class={styles.cost}>$0</div>
            </div>
            <div>Features:</div>
          </div>
          <ul class={styles.list}>
            <li>Access to custom charts</li>
            <li>Up to 10 queries per hour</li>
          </ul>
        </div>

        <div class={classnames([styles.pricingBlock, styles.basicPricingBlock])}>
          <div class={styles.heading}>
            <div>
              <div class={classnames([styles.pricingTitle, styles.popularTile])}>
                Basic
              </div>
              <div class={classnames([styles.cost, styles.popularCost])}>
                $10
              </div>
            </div>
            <div>Features:</div>
          </div>
          <ul class={classnames([styles.list, styles.basicList])}>
            <li>Access to even more custom charts</li>
            <li>Up to 50 queries per hour</li>
            <li>Weekly personalized email reports</li>
            <li>Weekly pricing recommendations</li>
          </ul>
        </div>

        <div class={styles.pricingBlock}>
          <div class={styles.heading}>
            <div>
              <div class={styles.pricingTitle}>Pro</div>
              <div class={styles.cost}>$20</div>
            </div>
            <div>Features:</div>
          </div>
          <ul class={styles.list}>
            <li>All basic features</li>
            <li>Unlimited queries</li>
            <li>Download CSV/JSON data</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PricingBlock;
