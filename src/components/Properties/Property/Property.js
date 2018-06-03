import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    console.log(selectedProperty);

    return selectedProperty ? (
      <div
        className={styles.heroImage}
        style={{
          backgroundImage: `url(${selectedProperty.picture_url})`,
        }}
      />
    ) : null;
  }
}

export default withPropertiesContainer(Property);
