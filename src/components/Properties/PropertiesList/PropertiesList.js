import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import BedIcon from 'react-icons/lib/fa/bed';
import HomeIcon from 'react-icons/lib/fa/home';
import GuestIcon from 'react-icons/lib/md/person';
import EditIcon from 'react-icons/lib/io/edit';
import DeleteIcon from 'react-icons/lib/md/delete-forever';
import RefreshIcon from 'react-icons/lib/io/android-refresh';
import RemoveProperty from '../RemoveProperty/RemoveProperty';
import { Button } from '../../common';
import styles from './PropertiesList.scss';

export default class PropertiesList extends Component {
  static propTypes = {
    properties: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  };

  state = {
    confirmDeleteModalOpened: false,
  };

  toggleConfirmDeleteModal = () => {
    this.setState({ confirmDeleteModalOpened: !this.state.confirmDeleteModalOpened });
  }

  render() {
    const { properties } = this.props;
    const { confirmDeleteModalOpened } = this.state;
    return (
      <div className={styles.root}>
        {properties.map(property => (
          <div className={styles.row} key={property.id}>
            <Modal open={confirmDeleteModalOpened} onClose={this.toggleConfirmDeleteModal} little>
              <RemoveProperty
                property={property}
                closeModal={this.toggleConfirmDeleteModal}
              />
            </Modal>
            <div
              className={styles.img}
              style={{
                backgroundImage: `url(${property.picture_url})`,
              }}
            />
            <div className={styles.col}>
              <div className={styles.title}>
                {property.name}
              </div>
              <div className={styles.property}>
                <div>
                  {property.bedrooms}&nbsp;-&nbsp;
                  <HomeIcon />
                </div>
                <div>
                  {property.beds}&nbsp;-&nbsp;
                  <BedIcon />
                </div>
                <div>
                  {property.person_capacity}&nbsp;-&nbsp;
                  <GuestIcon />
                </div>
              </div>
              <div className={styles.city}>
                {property.localized_city}
              </div>
            </div>
            <div className={classnames([styles.col, styles.rightAligned])}>
              <Button
                kind="danger"
                title="Remove listing"
                className={styles.ovalBtn}
                onClick={this.toggleConfirmDeleteModal}
              >
                <DeleteIcon />
              </Button>
              <Button
                kind="success"
                title="Refresh listing data"
                className={styles.ovalBtn}
                onClick={() => console.log('dddd')}
              >
                <RefreshIcon />
              </Button>
              <Link to={`/settings/properties/${property._id}`}>
                <Button
                  title="Edit listing notifications"
                  kind="info"
                  className={styles.ovalBtn}
                  onClick={() => console.log('dddd')}
                >
                  <EditIcon />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
