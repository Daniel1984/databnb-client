import { h, Component } from 'preact';
import styles from './Map.scss';
import customHouseMarkerIcon from '../../shared/customHouseMarkerIcon';
import HouseImg from '../../assets/house3.png';
import HouseImgShadow from '../../assets/house3_shadow.png';

class Map extends Component {
  componentDidMount() {
    this.map = L.map(this.mapEl);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  componentWillReceiveProps({ latlng, listings }) {
    if (this.markersLayer) {
      this.map.removeLayer(this.markersLayer);
    }

    if (listings.length) {
      const { markers, bounds } = listings.reduce((acc, curr) => {
        acc.markers.push(L.marker([curr.lat, curr.lng], { icon: customHouseMarkerIcon }).bindPopup('I am a green leaf.'));
        acc.bounds.push([curr.lat, curr.lng]);
        return acc;
        // L.marker([listing.lat, listing.lng]).addTo(this.map).bindPopup("I am a green leaf.");
      }, { markers: [], bounds: [] });

      this.map.fitBounds(bounds);
      this.markersLayer = L.featureGroup(markers);
      this.map.addLayer(this.markersLayer);
    }
  }

  render() {
    return (
      <div class={styles.root}>
        <div ref={el => this.mapEl = el} class={styles.map}></div>
      </div>
    );
  }
}

export default Map
