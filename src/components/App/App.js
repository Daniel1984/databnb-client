import places from 'places.js';
import { calculatePrice } from '../../shared/api';
import './App.scss';

import { h, Component } from 'preact';
import Heading from '../Heading/Heading';
import PricingForm from '../PricingForm/PricingForm';
import PlatformFeatures from '../PlatformFeatures/PlatformFeatures';
import PricingResults from '../PricingResults/PricingResults';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      latlng: null,
      city: null,
      bedrooms: 0,
      listings: [],
      address: '',
    };
  }

  updateState(payload) {
    this.setState(payload);
  }

  render() {
    const { latlng, listings, address, bedrooms } = this.state;

    return (
      <div class="app">
        <Heading />
        <PricingForm updateParentState={state => this.updateState(state)} />
        <PricingResults latlng={latlng} listings={listings} address={address} bedrooms={bedrooms} />
        <PlatformFeatures />
      </div>
    );
  }
}
