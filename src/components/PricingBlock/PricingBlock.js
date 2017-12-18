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
          <div class={styles.pricingTitle}>Free</div>
          <div class={styles.cost}>$0</div>
        </div>

        <div class={styles.pricingBlock}>
          <div class={classnames([styles.pricingTitle, styles.popularTile])}>
            Basic
          </div>
          <div class={classnames([styles.cost, styles.popularCost])}>
            $10
          </div>
        </div>

        <div class={styles.pricingBlock}>
          <div class={styles.pricingTitle}>Pro</div>
          <div class={styles.cost}>$20</div>
        </div>
      </div>
    </div>
  );
}

export default PricingBlock;
