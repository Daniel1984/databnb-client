import React, { Component } from 'react';
import { parse } from 'qs';
import { Input, Button, Card, SettingsPageContainer } from '../../components/common';
import axios from '../../shared/axios';
import config from '../../../config';
import Navbar from '../../components/Navbar/Navbar';
import styles from './ChangePassword.scss';

export default class ChangePassword extends Component {
  state = {
    password: '',
    changePassError: null,
  };

  onPasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  submitNewPassword = (e) => {
    e.preventDefault();
    const { token } = parse(this.props.location.search.substr(1));
    axios.post(`${config.apiUrl}/change-password`, { body: { ...this.state, token } })
      .then(({ email }) => {
        this.props.history.push(`/login?email=${email}`);
      })
      .catch(({ err }) => {
        this.setState({ changePassError: err });
      });
  }

  render() {
    const { password, changePassError, email } = this.state;

    return (
      <SettingsPageContainer>
        <Navbar title="META BNB" />
        <div className={styles.cardContainer}>
          <Card title="Change Password">
            <form className={styles.form} onSubmit={this.submitNewPassword}>
              <div className={styles.inputContainer}>
                <Input
                  thickLines
                  type="password"
                  value={password}
                  placeholder="New password"
                  onChange={this.onPasswordChange}
                />
              </div>
              {!!changePassError && (
                <div className={styles.inputContainer}>
                  <div className={styles.error}>{changePassError}</div>
                </div>
              )}
              <div className={styles.inputContainer}>
                <Button kind="success" onClick={this.submitNewPassword}>
                  Change password
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </SettingsPageContainer>
    );
  }
}
