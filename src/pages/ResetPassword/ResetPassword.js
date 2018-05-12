import React, { Component } from 'react';
import { Input, Button, Card, SettingsPageContainer } from '../../components/common';
import axios from '../../shared/axios';
import config from '../../../config';
import Navbar from '../../components/Navbar/Navbar';
import styles from './ResetPassword.scss';

export default class ResetPassword extends Component {
  state = {
    email: '',
    resetError: false,
    resetSuccess: false,
  };

  onEmailChange = (e) => {
    this.setState({ email: e.target.value });
  }

  requestPasswordReset = (e) => {
    e.preventDefault();
    axios.post(`${config.apiUrl}/request-password-reset`, { body: this.state })
      .then(() => {
        this.setState({ resetError: null, resetSuccess: true });
      })
      .catch(({ err }) => {
        this.setState({ resetError: err });
      });
  }

  render() {
    const { resetSuccess, resetError, email } = this.state;

    return (
      <SettingsPageContainer>
        <Navbar title="META BNB" />
        <div className={styles.cardContainer}>
          <Card title="Reset Password">
            {!resetSuccess && (
              <form className={styles.form} onSubmit={this.requestPasswordReset}>
                <div className={styles.inputContainer}>
                  <Input
                    thickLines
                    type="email"
                    value={email}
                    placeholder="Email Address"
                    onChange={this.onEmailChange}
                  />
                </div>
                {!!resetError && (
                  <div className={styles.inputContainer}>
                    <div className={styles.error}>{resetError}</div>
                  </div>
                )}
                <div className={styles.inputContainer}>
                  <Button kind="success" onClick={this.requestPasswordReset}>
                    Reset my password
                  </Button>
                </div>
              </form>
            )}
            {resetSuccess && (
              <div className={styles.successContainer}>
                <div className={styles.successTitle}>Done!</div>
                <div className={styles.successMsg}>
                  Reset password instructions were sent to your email address.
                </div>
              </div>
            )}
          </Card>
        </div>
      </SettingsPageContainer>
    );
  }
}
