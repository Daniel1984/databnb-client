// import 'material-design-lite';
import places from 'places.js';
import { calculatePrice } from './api';
import './index.scss';

import { h, render } from 'preact';
import Heading from '../components/Heading/Heading';
import PricingForm from '../components/PricingForm/PricingForm';
import PlatformFeatures from '../components/PlatformFeatures/PlatformFeatures';
import Map from '../components/Map/Map';

window.onload = () => {

  render((
    <div class="app">
      <Heading />
      <PricingForm />
      <Map />
      <PlatformFeatures />
    </div>
  ), document.body);

  const calculatePriceMinParams = {
    latlng: null,
    city: null,
    bedrooms: 0,
  };

  const map = L.map('map');

  const calculateBtn = document.querySelector('.app_form-btn');
  const bedroomSelectEl = document.querySelector('.app_form-select');

  calculateBtn.addEventListener('click', () => {
    const bedrooms = bedroomSelectEl.options[bedroomSelectEl.selectedIndex].value;

    calculatePrice({ ...calculatePriceMinParams, bedrooms }).then(({ listingsWithAvailabilities }) => {
      listingsWithAvailabilities.forEach((listing) => {
        L.marker([listing.lat, listing.lng]).addTo(map).bindPopup("I am a green leaf.");
      });
    });
  });

  const placesAutocomplete = places({
    container: document.querySelector('#address'),
    type: 'address'
  });

  function storeLookupResults(e) {
    const { latlng, city } = e.suggestion;

    if (latlng && city) {
      map.setView([latlng.lat, latlng.lng], 16);
      calculatePriceMinParams.latlng = latlng;
      calculatePriceMinParams.city = city;
      calculateBtn.removeAttribute('disabled');
    } else {
      calculatePriceMinParams.latlng = null;
      calculatePriceMinParams.city = null;
      calculateBtn.setAttribute('disabled', true);
    }
  }

  placesAutocomplete.on('change', storeLookupResults);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
}
