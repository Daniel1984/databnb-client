import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { withPropertiesContainer } from '../../../containers/Properties';
import styles from './Property.scss';

export class Property extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        propertyId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    getPropertyById: PropTypes.func.isRequired,
    selectedProperty: PropTypes.shape({}),
  };

  static defaultProps = {
    selectedProperty: null,
  }

  componentDidMount = () => {
    this.props.getPropertyById(this.props.match.params.propertyId);
  }

  render() {
    const { selectedProperty } = this.props;

    return selectedProperty ? (
      <Map
        scrollWheelZoom={false}
        center={[selectedProperty.lat, selectedProperty.lng]}
        zoom={14}
        className={styles.map}
      >
        <TileLayer url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png" />
        <Marker position={[selectedProperty.lat, selectedProperty.lng]}>
          <Popup>
            <div
              className={styles.heroImage}
              style={{
                backgroundImage: `url(${selectedProperty.picture_url})`,
              }}
            />
          </Popup>
        </Marker>
      </Map>
    ) : null;
  }
}

export default withPropertiesContainer(Property);
