import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import { withPropertiesContainer } from '../../../containers/Properties';
import { SpinnerLoader, Card, Button } from '../../common';
import AddNewProperty from '../AddNewProperty/AddNewProperty';
import PropertiesList from '../PropertiesList/PropertiesList';
import styles from './PropertySettings.scss';

export class PropertySettings extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    properties: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  };

  state = {
    addNewPropertyModalOpened: false,
  };

  toggleAddPropertyModal = () => {
    this.setState({ addNewPropertyModalOpened: !this.state.addNewPropertyModalOpened });
  }

  render() {
    const { addNewPropertyModalOpened } = this.state;
    const { isLoading, error, properties } = this.props;

    return (
      <Fragment>
        <Modal open={addNewPropertyModalOpened} onClose={this.toggleAddPropertyModal} little>
          <AddNewProperty onClose={this.toggleAddPropertyModal} />
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
          {isLoading && (
            <SpinnerLoader />
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
