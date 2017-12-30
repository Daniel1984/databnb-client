import { h, Component } from 'preact';
import styles from './HeatMap.scss';
import HeatMapLayer from 'leaflet-heatmap';

function getGroupedByDatePrices(listings) {
  return listings.reduce((acc, { lat, lng, availability }) => {
    const listingInfo = { lat, lng };
    let price = 0;

    const availabilityKeys = Object.keys(availability);

    availabilityKeys.forEach((key) => {
      price += availability[key].nativePriceTotal;
    });

    acc = [...acc, { ...listingInfo, price: price / availabilityKeys.length }];

    return acc;
  }, []);
}

const heatmapCfg = {
  radius: 0.001,
  maxOpacity: .8,
  scaleRadius: true,
  // if set to false the heatmap uses the global maximum for colorization
  // if activated: uses the data maximum within the current map boundaries
  //   (there will always be a red spot with useLocalExtremas true)
  useLocalExtrema: true,
  latField: 'lat',
  lngField: 'lng',
  valueField: 'price'
};


export default class HeatMap extends Component {
  componentDidMount() {
    const { latlng: { lat, lng }, listings } = this.props;
    const heatmapData = getGroupedByDatePrices(listings);

    const baseLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });

    this.heatmapLayer = new HeatMapLayer(heatmapCfg);
    // this.map = L.map(this.mapEl).setView([lat, lng], 15);
    this.map = new L.Map(this.mapEl, {
      center: new L.LatLng(lat, lng),
      zoom: 17,
      layers: [baseLayer, this.heatmapLayer],
    });

    L.marker([lat, lng]).addTo(this.map).bindPopup('I am a green leaf.');

    this.heatmapLayer.setData({
      max: 20,
      data: heatmapData,
    });
  }

  componentWillReceiveProps({ latlng: { lat, lng}, listings }) {
    L.marker([lat, lng]).addTo(this.map).bindPopup('I am a green leaf.');
    this.map.setView([lat, lng], 15);

    const heatmapData = getGroupedByDatePrices(listings);
    console.log('componentWillReceiveProps - ', heatmapData);
    this.heatmapLayer.setData({
      max: 15,
      data: heatmapData,
    });
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
