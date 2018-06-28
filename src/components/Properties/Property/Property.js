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
            <PropertyMap property={selectedProperty} />
            <div className={styles.propertyName}>{selectedProperty.name}</div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default withPropertiesContainer(Property);
