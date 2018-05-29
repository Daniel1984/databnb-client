import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Autocomplete.scss';

export default class Autocomplete extends Component {
  static propTypes = {
    updateParentState: PropTypes.func.isRequired,
    formDisabled: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const autoCompleteForm = new google.maps.places.Autocomplete(this.chartElRef.current, {
      types: ['geocode'],
    });

    autoCompleteForm.addListener('place_changed', () => {
      const place = autoCompleteForm.getPlace();
      const address = place.formatted_address || '';

      if (!place || !place.address_components || !place.geometry) {
        return;
      }

      const { lat, lng } = place.geometry.location;

      if (lat && lng) {
        this.props.updateParentState({
          address,
          latlng: {
            lat: lat(),
            lng: lng(),
          },
          btnEnabled: true,
        });
      }
    });
  }

  chartElRef = createRef();

  render() {
    const { formDisabled } = this.props;

    return (
      <input
        ref={this.chartElRef}
        className={styles.input}
        placeholder="Type in your address"
        disabled={formDisabled}
      />
    );
  }
}

// import React, { Component } from 'react';
// import places from 'places.js';

// export default class Autocomplete extends Component {
//   componentDidMount() {
//     places({
//       container: this.placesEl,
//       type: 'address'
//     }).on('change', (e) => {
//       const { latlng, city } = e.suggestion;
//       this.props.updateParentState({ latlng, city });
//     });
//   }

//   shouldComponentUpdate() {
//     return false;
//   }

//   render() {
//     return (
//       <input
//         id="address"
//         ref={el => this.placesEl = el}
//         class={this.props.styles}
//         placeholder="Type in your address"
//       />
//     )
//   }
// }
