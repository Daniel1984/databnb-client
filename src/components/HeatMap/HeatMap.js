import { h, Component } from 'preact';
import styles from './HeatMap.scss';
import HeatMapLayer from 'leaflet-heatmap';

export default class HeatMap extends Component {
  componentDidMount() {
    const { lat, lng } = this.props.latlng;
    this.map = L.map(this.mapEl).setView([lat, lng], 15);
    L.marker([lat, lng]).addTo(this.map).bindPopup('I am a green leaf.');

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  componentWillReceiveProps({ latlng: { lat, lng} }) {
    L.marker([lat, lng]).addTo(this.map).bindPopup('I am a green leaf.');
    this.map.setView([lat, lng], 15);
  }

  render() {
    return (
      <div>
        <h1>Prices heatmap</h1>
        <div ref={el => this.mapEl = el} class={styles.map}></div>
      </div>
    )
  }
}
