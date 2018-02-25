import React, { Component } from 'react';
import styles from './Landing.scss';
import Heading from '../../components/Heading/Heading';
import PlatformFeatures from '../../components/PlatformFeatures/PlatformFeatures';
import PricingResults from '../../components/PricingResults/PricingResults';
import PricingBlock from '../../components/PricingBlock/PricingBlock';
import About from '../../components/About/About';
import Footer from '../../components/Footer/Footer';
import SuccessStories from '../../components/SuccessStories/SuccessStories';
import socketio from '../../shared/socket';

export default class Landing extends Component {
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
      <div>
        <div className={styles.spacer} />
        <Heading listings={listings} latlng={latlng} updateParentState={state => this.updateState(state)} />
        <PricingResults
          latlng={latlng}
          listings={listings}
          address={address}
        />
        {(fetchedListings && !listings.length) && (
          <div className={styles.noListings}>
            Unfortunately there's no <b>{bedrooms} bedroom</b> listings in <b>{address}</b> area
          </div>
        )}
        <About />
        <PlatformFeatures />
        <PricingBlock />
        <SuccessStories />
        <Footer />
      </div>
    );
  }
}
