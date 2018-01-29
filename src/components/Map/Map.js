import { h, Component } from 'preact';
import HeatMapLayer from 'leaflet-heatmap';
import styles from './Map.scss';
import customHouseMarkerIcon from '../../shared/customHouseMarkerIcon';
import HouseImg from '../../assets/house3.png';
import HouseImgShadow from '../../assets/house3_shadow.png';

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

class Map extends Component {
  componentDidMount() {
    this.heatmapLayer = new HeatMapLayer(heatmapCfg);

    this.map = L.map(this.mapEl, {
      scrollWheelZoom: false,
      layers: [this.heatmapLayer],
    });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.updateMap(this.props);
  }

  componentWillUnmount() {
    this.map.remove();
  }

  componentWillReceiveProps(newProps) {
    this.updateMap(newProps);
  }

  updateMap({ listings }) {
    if (this.markersLayer) {
      this.map.removeLayer(this.markersLayer);
    }

    if (this.markerLayerControls) {
      this.markerLayerControls.remove(this.map);
    }

    if (listings.length) {
      const { markers, bounds } = listings.reduce((acc, { lat, lng, currentDayPrice, currency, id }) => {
        acc.markers.push(
          L.marker([lat, lng], { icon: customHouseMarkerIcon })
            .bindPopup(`${currentDayPrice} ${currency}/night <br /> <a target="_blank" href="http://airbnb.com/rooms/${id}">View Property</a>`)
        );

        acc.bounds.push([lat, lng]);

        return acc;
      }, { markers: [], bounds: [] });

      this.markersLayer = L.featureGroup(markers);

      const layerControls = {
        Markers: this.markersLayer,
        Heatmap: this.heatmapLayer,
      };

      this.heatmapLayer.setData({ data: getGroupedByDatePrices(listings) });
      this.markerLayerControls = L.control.layers(null, layerControls);
      this.map.fitBounds(bounds);
      this.map.addLayer(this.markersLayer);
      this.markerLayerControls.addTo(this.map);
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
