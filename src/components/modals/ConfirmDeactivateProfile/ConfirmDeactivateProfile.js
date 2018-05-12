import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import { withRouter } from 'react-router-dom';
import styles from './ConfirmDeactivateProfile.scss';
import { Button } from '../../common';
import axios from '../../../shared/axios';
import config from '../../../../config';

export class ConfirmDeactivateProfile extends Component {
  state = {
    deactivateButtonDisabled: false,
  };

  deactivateAccount = (e) => {
    e.preventDefault();
    this.setState({ deactivateButtonDisabled: true });

    axios.post(`${config.apiUrl}/deactivate-account`, { body: {} })
      .then((res) => {
        this.props.onClose();
        sessionStorage.clear();
        this.props.history.push('/signup');
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
            <Button onClick={this.deactivateAccount} disabled={deactivateButtonDisabled} danger>
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

export default withRouter(ConfirmDeactivateProfile);
