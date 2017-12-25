import { h, Component } from 'preact';
import places from 'places.js';
import styles from './PricingForm.scss';
import Autocomplete from '../Autocomplete/Autocomplete';
import { calculatePrice } from '../../shared/api';
import { Select } from '../common';
import socket from '../../shared/socket';

const localeToGeolocation = {
  london: {
    lat: 51.5073835,
    lng: -0.1277801,
    radius: 20000,
    country: 'gb'
  }
};

export default class PricingForm extends Component {
  state = {
    btnEnabled: false,
    bedrooms: 2,
    btnText: 'Calculate',
  };

  componentDidMount() {
    const autoCompleteForm = new google.maps.places.Autocomplete(this.placesEl, {
      types: ['geocode']
    });

    autoCompleteForm.addListener('place_changed', () => {
      const place = autoCompleteForm.getPlace();
      const address = place.formatted_address || '';
      console.log(address)

      if (!place || !place.address_components || !place.geometry) {
        return;
      }

      const latlng = place.geometry.location;

      if (latlng.lat && latlng.lng) {
        this.setState({
          address,
          latlng: {
            lat: latlng.lat(),
            lng: latlng.lng(),
          },
          btnEnabled: true,
        });
      }
    });

    socket.get().on('listings', ({ listings }) => {
      const { latlng, bedrooms, address } = this.state;
      this.setState({ btnEnabled: true, btnText: 'Calculate', listings });
      this.props.updateParentState({ listings, latlng, address, bedrooms });
    });

    socket.get().on('listing', ({ listing }) => {
      console.log(listing[0]);
      const { latlng, bedrooms, address } = this.state;
      this.props.updateParentState({
        listings: [...this.props.listings, ...listing],
        latlng,
        address,
        bedrooms
      });
    });

    socket.get().on('reenableForm', () => {
      this.setState({ btnEnabled: true, btnText: 'Calculate' });
    });

    socket.get().on('getListings:loadingInfo', ({ msg }) => {
      this.setState({ btnText: msg });
    });
  }

  componentWillReceiveProps() {
    this.rootEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  getPricingInfo = () => {
    this.setState({ btnEnabled: false, btnText: 'Loading...' });
    const { latlng, bedrooms, address } = this.state;
    socket.get().emit('getListings', { ...latlng, bedrooms, address });
  }

  render() {
    const { bedrooms, btnText, btnEnabled } = this.state;

    return (
      <div ref={el => this.rootEl = el} class={styles.root}>
        <h3 class={styles.title}>Make the most of your property</h3>
        <div class={styles.formContainer}>
          <div class={styles.formControl}>
            <input
              ref={el => this.placesEl = el}
              class={styles.input}
              placeholder="Type in your address"
            />
          </div>
          <div class={styles.selectContainer}>
            <Select
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
          <div class={styles.formControl}>
            <button
              onClick={this.getPricingInfo}
              class={styles.btn}
              disabled={!btnEnabled}
            >
              {btnText}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
