import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import styles from './Dashboard.scss';
import { Select, Button } from '../common';
import socket from '../../shared/socket';
import AreaQuickSummary from '../AreaQuickSummary/AreaQuickSummary'

export default class Dashboard extends Component {
  state = {
    btnEnabled: false,
    formDisabled: false,
    bedrooms: 2,
    btnText: 'Calculate',
    listings: []
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
    const { bedrooms, btnText, btnEnabled, formDisabled, listings, address } = this.state;

    return (
      <div class={styles.root}>
        <div class={styles.name}>META BNB</div>
        <div class={styles.title}>Make the most of your property:</div>
        <div class={styles.formControl}>
          <input
            ref={el => this.placesEl = el}
            class={styles.input}
            placeholder="Type in your address"
            disabled={formDisabled}
          />
        </div>
        <div class={styles.formControl}>
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

        <div class={styles.formControl}>
          <Button onClick={this.getPricingInfo} disabled={!btnEnabled}>
            {btnText}
          </Button>
        </div>

        <div class={styles.ctaContainer}>
          <Link href="/login" class={styles.loginBtn}>Login</Link>
          <div class={styles.spacer}>/</div>
          <Link href="/signup" class={styles.signupBtn}>Sign Up</Link>
        </div>

        {!!listings.length && (
          <div class={styles.quickSummary}>
            <AreaQuickSummary listings={listings} address={address} />
          </div>
        )}
      </div>
    );
  }
}
