import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { SpinnerLoader, InfoBox } from '../../common';
import { withPropertiesContainer } from '../../../containers/Properties';
import PropertyMap from './PropertyMap/PropertyMap';
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
    nearbyListings: PropTypes.arrayOf(PropTypes.shape({})),
    isLoadingProperty: PropTypes.bool.isRequired,
    loadingPropertyMsg: PropTypes.string.isRequired,
    errorGettingProperty: PropTypes.string.isRequired,
  };

  static defaultProps = {
    selectedProperty: null,
    nearbyListings: null,
  }

  componentDidMount = () => {
    this.props.getPropertyById(this.props.match.params.propertyId);
  }

  render() {
    const {
      selectedProperty,
      isLoadingProperty,
      errorGettingProperty,
      nearbyListings,
      loadingPropertyMsg,
    } = this.props;

    return (
      <Fragment>
        {errorGettingProperty && (
          <InfoBox>{errorGettingProperty}</InfoBox>
        )}

        {selectedProperty && (
          <Fragment>
            <PropertyMap property={selectedProperty} nearbyListings={nearbyListings} />
            <div className={styles.propertyName}>{selectedProperty.name}</div>
          </Fragment>
        )}

        {isLoadingProperty && (
          <div className={styles.loadingContainer}>
            <SpinnerLoader />
            <div className={styles.loadingMsg}>
              {loadingPropertyMsg}
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default withPropertiesContainer(Property);
