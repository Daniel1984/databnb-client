import React, { Component } from 'react';
import { Footer } from '../common';
import socketio from '../../shared/socket';
import Heading from './Heading/Heading';
import PlatformFeatures from './PlatformFeatures/PlatformFeatures';
import PricingResults from './PricingResults/PricingResults';
import PricingBlock from './PricingBlock/PricingBlock';
import About from './About/About';
import SuccessStories from './SuccessStories/SuccessStories';
import styles from './Landing.scss';

export default class Landing extends Component {
  state = {
    latlng: null,
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
    const {
      latlng,
      listings,
      address,
      bedrooms,
      fetchedListings,
    } = this.state;

    return (
      <div>
        <div className={styles.spacer} />
        <Heading
          listings={listings}
          latlng={latlng}
          updateParentState={state => this.updateState(state)}
        />
        <PricingResults
          latlng={latlng}
          listings={listings}
          address={address}
        />
        {(fetchedListings && !listings.length) && (
          <div className={styles.noListings}>
            Unfortunately there`s no <b>{bedrooms} bedroom</b> listings in <b>{address}</b> area
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