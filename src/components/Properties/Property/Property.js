import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { SpinnerLoader, Card, Button, InfoBox } from '../../common';
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
    isLoadingProperty: PropTypes.bool.isRequired,
    errorGettingProperty: PropTypes.string.isRequired,
  };

  static defaultProps = {
    selectedProperty: null,
  }

  componentDidMount = () => {
    this.props.getPropertyById(this.props.match.params.propertyId);
  }

  render() {
    const { selectedProperty, isLoadingProperty, errorGettingProperty } = this.props;
    console.log(isLoadingProperty)

    return (
      <Fragment>
        {isLoadingProperty && (
          <SpinnerLoader />
        )}

        {errorGettingProperty && (
          <InfoBox>{errorGettingProperty}</InfoBox>
        )}

        {selectedProperty && (
          <Fragment>
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
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default withPropertiesContainer(Property);
