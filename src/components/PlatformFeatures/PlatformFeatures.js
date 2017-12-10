import { h } from 'preact';
import HourGlassIcon from '../../assets/icons/hourglass.svg';
import TrophyIcon from '../../assets/icons/trophy.svg';
import MoneyBagIcon from '../../assets/icons/money-bag.svg';

function PlatformFeatures() {
  return (
    <div class="app_features">
      <div class="app_features-col">
        <img class="app_features-icon" src={HourGlassIcon} />
        <div class="app_feature-msg">
          Value your time! Let us handle the calculations
        </div>
      </div>
      <div class="app_features-col">
        <img class="app_features-icon" src={TrophyIcon} />
        <div class="app_feature-msg">
          Be the first to know when the market changes and adjust accordingly
        </div>
      </div>
      <div class="app_features-col">
        <img class="app_features-icon" src={MoneyBagIcon} />
        <div class="app_feature-msg">
          Increase your rental income in matter of days
        </div>
      </div>
    </div>
  );
}

export default PlatformFeatures;
