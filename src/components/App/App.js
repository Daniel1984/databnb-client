import places from 'places.js';
import { calculatePrice } from '../../shared/api';
import styles from './App.scss';

import { h, Component } from 'preact';
import Heading from '../Heading/Heading';
import PricingForm from '../PricingForm/PricingForm';
import PlatformFeatures from '../PlatformFeatures/PlatformFeatures';
import PricingResults from '../PricingResults/PricingResults';
import PricingBlock from '../PricingBlock/PricingBlock';
import Footer from '../Footer/Footer';
import SuccessStories from '../SuccessStories/SuccessStories';
import socketio from '../../shared/socket';

export default class App extends Component {
  state = {
    latlng: null,
    city: null,
    bedrooms: 0,
    listings: [],
    address: '',
    fetchedListings: false,
  };

  componentWillMount() {
    socketio.init();
  }

  updateState(payload) {
    this.setState(payload);
  }

  render() {
    const { latlng, listings, address, bedrooms, fetchedListings } = this.state;

    return (
      <div class="app">
        <Heading />
        <PricingForm listings={listings} updateParentState={state => this.updateState(state)} />
        <PricingResults
          latlng={latlng}
          listings={listings}
          address={address}
        />
        {(fetchedListings && !listings.length) && (
          <div class={styles.noListings}>
            Unfortunately there's no <b>{bedrooms} bedroom</b> listings in <b>{address}</b> area
          </div>
        )}
        <PlatformFeatures />
        <PricingBlock />
        <SuccessStories />
        <Footer />
      </div>
    );
  }
}
