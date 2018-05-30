import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import SettingsContainer from '../Settings/SettingsContainer/SettingsContainer';
import { getUserProperties } from '../../api/userProperties';
import { SpinnerLoader, Card, Button } from '../common';
import AddNewProperty from './AddNewProperty/AddNewProperty';
import PropertiesList from './PropertiesList/PropertiesList';
import styles from './Properties.scss';

export default class Properties extends Component {
  static propTypes = {
    user: PropTypes.shape({}),
  };

  static defaultProps = {
    user: null,
  };

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
    const { user } = this.props;
    const {
      addNewPropertyModalOpened,
      isLoading,
      error,
      properties,
    } = this.state;
    return (
      <SettingsContainer user={user}>
        <Fragment>
          <Modal open={addNewPropertyModalOpened} onClose={this.toggleAddPropertyModal} little>
            <AddNewProperty onClose={this.toggleAddPropertyModal} />
          </Modal>
          <div className={styles.cardContainer}>
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
          </div>
          <div className={styles.listContainer}>
            {isLoading && (
              <SpinnerLoader />
            )}

            {!!properties.length && (
              <PropertiesList properties={properties} />
            )}
          </div>
        </Fragment>
      </SettingsContainer>
    );
  }
}
