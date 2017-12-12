import { h, Component } from 'preact';
import styles from './Map.scss';
import HouseImg from '../../assets/house3.png';

class Map extends Component {
  componentDidMount() {
    this.map = L.map(this.mapEl);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  componentWillReceiveProps(newProps) {
    const { latlng, bedrooms } = this.props;
    const locationChanged = latlng && (latlng.lat !== newProps.latlng.lat || latlng.lng !== newProps.latlng.lng);
    const bedroomsChanged = bedrooms && (bedrooms !== newProps.bedrooms);

    if (locationChanged || bedroomsChanged) {
      this.map.removeLayer(this.markersLayer);
    }
  }

  componentDidUpdate() {
    const { latlng, listings } = this.props;

    const greenIcon = L.icon({
      iconUrl: HouseImg,
      iconSize: [35, 35],
      iconAnchor: [17, 17],
      popupAnchor: [0, -17],
    });

    if (latlng) {
      this.map.setView([latlng.lat, latlng.lng], 16);
    }

    if (listings.length) {
      const { markers, bounds } = listings.reduce((acc, curr) => {
        acc.markers.push(L.marker([curr.lat, curr.lng], {icon: greenIcon}).bindPopup("I am a green leaf."));
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
