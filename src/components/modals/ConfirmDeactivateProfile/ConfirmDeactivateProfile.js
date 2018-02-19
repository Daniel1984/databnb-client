import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import styles from './ConfirmDeactivateProfile.scss';
import { Button } from '../../common';
import fetch from '../../../shared/fetch';
import config from '../../../../config';

export default class ConfirmDeactivateProfile extends Component {
  state = {
    deactivateButtonDisabled: false,
  };

  deactivateAccount = (e) => {
    e.preventDefault();
    this.setState({ deactivateButtonDisabled: true });

    fetch(`${config.apiUrl}/deactivate-account`, { method: 'POST', body: {} })
      .then((res) => {
        this.props.onClose();
        sessionStorage.clear();
        this.props.history.push('/login');
      })
      .catch(({ err }) => {
        this.setState({ deactivateButtonDisabled: false });
        alert('Oops. Something went wrong. Please try again later');
      });
  }

  render() {
    const { opened, onClose } = this.props;
    const { deactivateButtonDisabled } = this.state;

    return (
      <Modal open={opened} onClose={onClose} little>
        <div className={styles.root}>
          <div className={styles.title}>
            Are you sure you want to deactivate your account?
          </div>
          <div className={styles.footer}>
            <Button onClick={this.deactivateAccount} disabled={deactivateButtonDisabled}>
              {deactivateButtonDisabled ? 'Loading...' : 'Deactivate'}
            </Button>
            <Button success onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}
