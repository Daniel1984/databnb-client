// import 'material-design-lite';
import places from 'places.js';
import { calculatePrice } from './api';
import './index.scss';

window.onload = () => {
  const placesAutocomplete = places({
    container: document.querySelector('#address'),
    type: 'address'
  });

  function showLookupResults(e) {
    console.log(e.suggestion)
    const { latlng, city } = e.suggestion;
    calculatePrice({ latlng, city }).then(res => console.log(res));
  }

  placesAutocomplete.on('change', showLookupResults);
}
