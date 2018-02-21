import React, { Component } from 'react';
import styles from './Dashboard.scss';
import { Select, Button } from '../common';
import socket from '../../shared/socket';
import fetch from '../../shared/fetch';
import config from '../../../config';
import AreaQuickSummary from '../AreaQuickSummary/AreaQuickSummary';
import AuthControls from '../AuthControls/AuthControls';
import Autocomplete from '../Autocomplete/Autocomplete';

export default class Dashboard extends Component {
  state = {
    btnEnabled: false,
    formDisabled: false,
    bedrooms: 2,
    btnText: 'Calculate',
    listings: [],
    user: null
  };

  componentDidMount() {
    this.getUserInfo();

    socket.get().on('listings', ({ listings }) => {
      const { latlng, bedrooms, address } = this.state;
      this.setState({
        btnEnabled: true,
        formDisabled: false,
        btnText: 'Calculate',
        listings
      });
      this.props.updateParentState({ listings, latlng, address, bedrooms, fetchedListings: true });
    });

    socket.get().on('listing', ({ listing }) => {
      this.setState({ listings: [...this.state.listings, ...listing] }, () => {
        const { latlng, bedrooms, address, listings } = this.state;

        this.props.updateParentState({
          listings,
          latlng,
          address,
          bedrooms,
          fetchedListings: true,
        });
      });
    });

    socket.get().on('reenableForm', () => {
      this.setState({
        btnEnabled: true,
        btnText: 'Calculate',
        formDisabled: false,
      });
    });

    socket.get().on('getListings:loadingInfo', ({ msg }) => {
      this.setState({ btnText: msg });
    });
  }

  componentWillReceiveProps() {
    this.getUserInfo();
  }

  getUserInfo() {
    fetch(`${config.apiUrl}/me`)
      .then(user => this.setState({ user }))
      .catch(() => this.setState({ user: null }));
  }

  getPricingInfo = () => {
    this.props.updateParentState({ fetchedListings: false });
    this.setState({
      btnEnabled: false,
      btnText: 'Loading...',
      listings: [],
      formDisabled: true,
    });
    const { latlng, bedrooms, address } = this.state;
    socket.get().emit('getListings', { ...latlng, bedrooms, address });
  }

  render() {
    const { bedrooms, btnText, btnEnabled, formDisabled, listings, address, user } = this.state;

    return (
      <div className={styles.root}>
        <div className={styles.name}>META BNB</div>
        <div className={styles.title}>Make the most of your property:</div>
        <div className={styles.formControl}>
          <Autocomplete
            formDisabled={formDisabled}
            updateParentState={state => this.setState({ ...this.state, ...state })}
          />
        </div>
        <div className={styles.formControl}>
          <Select
            disabled={formDisabled}
            value={bedrooms}
            onChange={e => this.setState({ bedrooms: e.target.value })}
          >
            <option value="0">Studio</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4 Bedrooms</option>
            <option value="5">5 Bedrooms</option>
          </Select>
        </div>

        <div className={styles.formControl}>
          <Button danger onClick={this.getPricingInfo} disabled={!btnEnabled}>
            {btnText}
          </Button>
        </div>

        <AuthControls user={user} />

        {!!listings.length && (
          <div className={styles.quickSummary}>
            <AreaQuickSummary listings={listings} address={address} />
          </div>
        )}
      </div>
    );
  }
}
