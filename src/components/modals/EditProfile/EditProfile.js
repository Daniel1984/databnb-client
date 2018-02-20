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

  oninputChange = (e) => {
    console.log(e.target.value);
  }

  render() {
    const { opened, onClose } = this.props;
    const { saveButtonDisabled } = this.state;

    return (
      <Modal open={opened} onClose={onClose} little>
        <div className={styles.root}>
          <div className={styles.title}>
            Edit profile
          </div>
          <FormControl label="Email:" vertical>
            <Input
              thickLines
              type="email"
              placeholder="Email Address"
              onChange={this.oninputChange}
            />
          </FormControl>
          <FormControl label="Full name:" vertical>
            <Input
              thickLines
              type="text"
              placeholder="Full name"
              onChange={this.oninputChange}
            />
          </FormControl>
          <FormControl label="Address:" vertical>
            <Input
              thickLines
              type="text"
              placeholder="Address"
              onChange={this.oninputChange}
            />
          </FormControl>
          <FormControl label="Phone number:" vertical>
            <Input
              thickLines
              type="phone"
              placeholder="Phone number"
              onChange={this.oninputChange}
            />
          </FormControl>
          <div className={styles.footer}>
            <Button success>
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
