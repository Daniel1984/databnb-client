import { h, Component } from 'preact';
import places from 'places.js';
import styles from './PricingForm.scss';
import Autocomplete from '../Autocomplete/Autocomplete';
import { calculatePrice } from '../../shared/api';

export default class PricingForm extends Component {
  state = {
    btnEnabled: false,
    bedrooms: 2,
  };

  componentDidMount() {
    const autoCompleteForm = new google.maps.places.Autocomplete(this.placesEl, {
      types: ['geocode']
    });

    autoCompleteForm.addListener('place_changed', () => {
      const place = autoCompleteForm.getPlace();
      const address = place.formatted_address || '';

      if (!place || !place.address_components || !place.geometry) {
        return;
      }

      const city = place.address_components.reduce((acc, curr) => {
        if (curr.types.indexOf('postal_town') !== -1) {
          acc = curr.short_name;
        }

        return acc;
      }, '');

      const latlng = place.geometry.location;

      if (latlng.lat && latlng.lng) {
        this.setState({
          city,
          address,
          latlng: {
            lat: latlng.lat(),
            lng: latlng.lng(),
          },
          btnEnabled: true,
        });
      }
    });
  }

  getPricingInfo = () => {
    const { latlng, city, bedrooms, address } = this.state;

    calculatePrice({ latlng, city, bedrooms }).then(({ listingsWithAvailabilities }) => {
      this.props.updateParentState({ listings: listingsWithAvailabilities, latlng, address, bedrooms });
    });
  }

  render() {
    const { bedrooms } = this.state;

    return (
      <div class={styles.root}>
        <h3 class={styles.title}>Make the most of your property</h3>
        <div class={styles.formContainer}>
          <div class={styles.formControl}>
            <input
              ref={el => this.placesEl = el}
              class={styles.input}
              placeholder="Type in your address"
            />
          </div>
          <div class={styles.formControlCustomDrpdown}>
            <select
              class={styles.select}
              value={bedrooms}
              onChange={e => this.setState({ bedrooms: e.target.value })}
            >
              <option value="0">Studio</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4 Bedrooms</option>
              <option value="5">5 Bedrooms</option>
            </select>
          </div>
          <div class={styles.formControl}>
            <button
              onClick={this.getPricingInfo}
              class={styles.btn}
              disabled={!this.state.btnEnabled}
            >
              Calculate
            </button>
          </div>
        </div>
      </div>
    );
  }
}
