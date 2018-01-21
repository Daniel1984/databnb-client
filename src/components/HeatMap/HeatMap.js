import { h, Component } from 'preact';
import classnames from 'classnames';
import HeatMapLayer from 'leaflet-heatmap';
import styles from './HeatMap.scss';
import customHouseMarkerIcon from '../../shared/customHouseMarkerIcon';

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
  maxOpacity: .6,
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
    const baseLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });

    this.heatmapLayer = new HeatMapLayer(heatmapCfg);
    this.markerLayer = L.featureGroup();

    this.map = new L.Map(this.mapEl, {
      zoom: 15,
      layers: [baseLayer, this.heatmapLayer, this.markerLayer],
    });

    this.updateMap(this.props);
  }

  componentWillUnmount() {
    this.map.remove();
  }

  componentWillReceiveProps(props) {
    this.updateMap(props);
  }

  updateMap({ latlng: { lat, lng }, listings, address }) {
    this.markerLayer.eachLayer(l => this.markerLayer.removeLayer(l));

    L
      .marker([lat, lng], { icon: customHouseMarkerIcon })
      .bindPopup(address)
      .addTo(this.markerLayer);

    this.map.setView([lat, lng], 15);
    this.heatmapLayer.setData({ data: getGroupedByDatePrices(listings) });
  }

  render() {
    return (
      <div class={styles.root}>
        <div class={classnames([styles.col, styles.mapCol])}>
          <div ref={el => this.mapEl = el} class={styles.map}></div>
        </div>
        <div class={classnames([styles.col, styles.info])}>
          <div class={styles.infoContent}>
            <div class={styles.colTitle}>
              Pricing heatmap in the area:
            </div>
          </div>
        </div>
      </div>
    )
  }
}
