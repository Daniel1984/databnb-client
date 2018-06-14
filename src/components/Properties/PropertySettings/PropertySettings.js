import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import { withPropertiesContainer } from '../../../containers/Properties';
import { SpinnerLoader, Card, Button, InfoBox } from '../../common';
import AddNewProperty from '../AddNewProperty/AddNewProperty';
import PropertiesList from '../PropertiesList/PropertiesList';
import styles from './PropertySettings.scss';

export class PropertySettings extends Component {
  static propTypes = {
    isLoadingProperties: PropTypes.bool.isRequired,
    errorGettingProperties: PropTypes.string.isRequired,
    properties: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    loadUserProperties: PropTypes.func.isRequired,
  };

  state = {
    addNewPropertyModalOpened: false,
  };

  toggleAddPropertyModal = () => {
    this.setState({ addNewPropertyModalOpened: !this.state.addNewPropertyModalOpened });
  }

  closeModalAndFetchProperties = async () => {
    await this.props.loadUserProperties();
    this.toggleAddPropertyModal();
  }

  render() {
    const { addNewPropertyModalOpened } = this.state;
    const { isLoadingProperties, errorGettingProperties, properties } = this.props;

    return (
      <Fragment>
        <Modal open={addNewPropertyModalOpened} onClose={this.toggleAddPropertyModal} little>
          <AddNewProperty
            onAddPropertySuccess={this.closeModalAndFetchProperties}
            onClose={this.toggleAddPropertyModal}
          />
        </Modal>
        <Card flex>
          <div className={styles.headerRow}>
            <div className={styles.title}>
              Properties
            </div>
            <Button kind="success" onClick={this.toggleAddPropertyModal}>
              Add new property
            </Button>
          </div>
          <div className={styles.infoContainer}>
            Add properties to know how you`re doing in comparison to your nearest competitors.
            Setup alerts and notifications to tracking price changes and adapt accordingly.
          </div>
        </Card>
        <div className={styles.listContainer}>
          {isLoadingProperties && (
            <SpinnerLoader />
          )}

          {errorGettingProperties && (
            <InfoBox>{errorGettingProperties}</InfoBox>
          )}

          {!!properties.length && (
            <PropertiesList properties={properties} />
          )}
        </div>
      </Fragment>
    );
  }
}

export default withPropertiesContainer(PropertySettings);
