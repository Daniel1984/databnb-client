import { h } from 'preact';
import styles from './PricingForm.scss';

function PricingForm() {
  return (
    <div class={styles.root}>
      <h3 class={styles.title}>Make the most of your property</h3>
      <div class={styles.formContainer}>
        <div class={styles.formControl}>
          <input class={styles.input} id="address" placeholder="Type in your address" />
        </div>
        <div class={styles.formControlCustomDrpdown}>
          <select class={styles.select}>
            <option selected value="0">Studio</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4 Bedrooms</option>
            <option value="5">5 Bedrooms</option>
          </select>
        </div>
        <div class={styles.formControl}>
          <button class={styles.btn} disabled>
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
}

export default PricingForm;
