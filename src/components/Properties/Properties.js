import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import Settings from '../../components/Settings/Settings';
import { Card, Button } from '../../components/common';
import AddNewProperty from './AddNewProperty/AddNewProperty';
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
  };

  toggleAddPropertyModal = () => {
    this.setState({ addNewPropertyModalOpened: !this.state.addNewPropertyModalOpened });
  }

  render() {
    const { user } = this.props;
    const { addNewPropertyModalOpened } = this.state;

    return (
      <Settings user={user}>
        {!!user && (
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
                  Add properties to know how you`re doing in comparison to your nearest competitors.<br />
                  Setup alerts and notifications to tracking price changinges and adopt accordingly.
                </div>
              </Card>
            </div>
          </Fragment>
        )}
      </Settings>
    );
  }
}
