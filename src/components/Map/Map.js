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

  componentWillUnmount() {
    this.map.remove();
  }

  componentWillReceiveProps({ listings }) {
    if (this.markersLayer) {
      this.map.removeLayer(this.markersLayer);
    }

    if (listings.length) {
      const { markers, bounds } = listings.reduce((acc, { lat, lng, currentDayPrice, currency, id }) => {
        acc.markers.push(
          L.marker([lat, lng], { icon: customHouseMarkerIcon })
            .bindPopup(`${currentDayPrice} ${currency}/night <br /> <a target="_blank" href="http://airbnb.com/rooms/${id}">View Property</a>`)
        );
        acc.bounds.push([lat, lng]);
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
