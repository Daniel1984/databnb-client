import { h } from 'preact';

function PricingForm() {
  return (
    <div class="app_form-container">
      <h3 class="app_form-title">Make the most of your property</h3>
      <div class="app_form-input-container">
        <div class="app_form-control">
          <input class="app_form-input" id="address" placeholder="Type in your address" />
        </div>
        <div class="app_form-control app_form-control--custom-dropdown">
          <select class="app_form-select">
            <option selected value="0">Studio</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4 Bedrooms</option>
            <option value="5">5 Bedrooms</option>
          </select>
        </div>
        <div class="app_form-control">
          <button class="app_form-btn" disabled>
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
}

export default PricingForm;
