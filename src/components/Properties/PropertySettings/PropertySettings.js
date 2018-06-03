import React, { Component, Fragment } from 'react';
import Modal from 'react-responsive-modal';
import { getUserProperties } from '../../../api/userProperties';
import { SpinnerLoader, Card, Button } from '../../common';
import AddNewProperty from '../AddNewProperty/AddNewProperty';
import PropertiesList from '../PropertiesList/PropertiesList';
import styles from './PropertySettings.scss';

export default class PropertySettings extends Component {
  state = {
    addNewPropertyModalOpened: false,
    properties: [],
    error: null,
    isLoading: true,
  };

  componentDidMount() {
    this.loadUserProperties();
  }

  loadUserProperties = async () => {
    this.setState({ isLoading: true });

    try {
      const { data } = await getUserProperties();
      this.setState({
        properties: data,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error: 'Oops. Something went wrong. Try again later',
        isLoading: false,
        properties: [],
      });
    }
  }

  toggleAddPropertyModal = () => {
    this.setState({ addNewPropertyModalOpened: !this.state.addNewPropertyModalOpened });
  }

  render() {
    const {
      addNewPropertyModalOpened,
      isLoading,
      error,
      properties,
    } = this.state;
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
