import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button } from '../../common';
import axios from '../../../shared/axios';
import config from '../../../../config';
import styles from './ConfirmDeactivateProfile.scss';

export class ConfirmDeactivateProfile extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  state = {
    deactivateButtonDisabled: false,
  };

  deactivateAccount = async (e) => {
    e.preventDefault();
    this.setState({ deactivateButtonDisabled: true });

    try {
      await axios.post(`${config.apiUrl}/deactivate-account`, {});
      this.props.onClose();
      localStorage.clear();
      this.props.history.push('/signup');
    } catch (error) {
      this.setState({ deactivateButtonDisabled: false });
      alert('Oops. Something went wrong. Please try again later');
    }
  }

  render() {
    const { onClose } = this.props;
    const { deactivateButtonDisabled } = this.state;

    return (
      <div className={styles.root}>
        <div className={styles.title}>
          Are you sure you want to deactivate your account?
        </div>
        <div className={styles.footer}>
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={this.deactivateAccount}
            disabled={deactivateButtonDisabled}
            kind="danger"
          >
            {deactivateButtonDisabled ? 'Loading...' : 'Deactivate'}
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(ConfirmDeactivateProfile);
