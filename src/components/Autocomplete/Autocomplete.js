import { h, Component } from 'preact';
import styles from './Autocomplete.scss';

export default class Autocomplete extends Component {
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

      const latlng = place.geometry.location;

      if (latlng.lat && latlng.lng) {
        this.props.updateParentState({
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


  render() {
    const { formDisabled } = this.props;

    return (
      <input
        ref={el => this.placesEl = el}
        class={styles.input}
        placeholder="Type in your address"
        disabled={formDisabled}
      />
    );
  }
}
