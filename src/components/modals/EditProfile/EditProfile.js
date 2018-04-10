import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import { withRouter } from 'react-router-dom';
import styles from './EditProfile.scss';
import { Button, Input, FormControl } from '../../common';
import fetch from '../../../shared/fetch';
import config from '../../../../config';

export class EditProfile extends Component {
  state = {
    saveButtonDisabled: false,
    ...this.props.user
  };

  saveAccount = (e) => {
    e.preventDefault();
    this.setState({ saveButtonDisabled: true });

    fetch(`${config.apiUrl}/deactivate-account`, { method: 'POST', body: {} })
      .then((res) => {
        this.props.onClose();
      })
      .catch(({ err }) => {
        this.setState({ saveButtonDisabled: false });
        alert('Oops. Something went wrong. Please try again later');
      });
  }

  saveProfile = () => {
    console.log(this.state);
    fetch(`${config.apiUrl}/me/${this.state._id}`, { method: 'PUT', body: this.state })
      .then((res) => {
        this.props.onClose();
      })
      .catch(({ err }) => {
        this.setState({ saveButtonDisabled: false });
        alert('Oops. Something went wrong. Please try again later');
      });
  }

  oninputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { opened, onClose } = this.props;
    const { saveButtonDisabled, email, address, fullName, telephoneNumber } = this.state;

    return (
      <Modal open={opened} onClose={onClose} little>
        <div className={styles.root}>
          <div className={styles.title}>
            Edit profile
          </div>
          <FormControl label="Email:" vertical>
            <Input
              thickLines
              name="email"
              type="email"
              value={email}
              placeholder="Email Address"
              onChange={this.oninputChange}
            />
          </FormControl>
          <FormControl label="Full name:" vertical>
            <Input
              thickLines
              name="fullName"
              type="text"
              value={fullName}
              placeholder="Full name"
              onChange={this.oninputChange}
            />
          </FormControl>
          <FormControl label="Address:" vertical>
            <Input
              thickLines
              name="address"
              value={address}
              type="text"
              placeholder="Address"
              onChange={this.oninputChange}
            />
          </FormControl>
          <FormControl label="Phone number:" vertical>
            <Input
              thickLines
              value={telephoneNumber}
              name="telephoneNumber"
              type="phone"
              placeholder="Phone number"
              onChange={this.oninputChange}
            />
          </FormControl>
          <div className={styles.footer}>
            <Button success onClick={this.saveProfile}>
              Save
            </Button>
            <Button regular onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default withRouter(EditProfile);
