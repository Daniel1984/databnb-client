import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Card, SettingsPageContainer } from '../../components/common';
import axios from '../../shared/axios';
import config from '../../../config';
import Navbar from '../../components/Navbar/Navbar';
import styles from './SignUp.scss';

export default class Signup extends Component {
  state = {
    email: '',
    password: '',
    registerError: null,
    registerSuccess: false,
  };

  oninputChange = (e) => {
    this.setState({
      [e.target.type]: e.target.value,
    });
  }

  submitNewUser = (e) => {
    e.preventDefault();
    axios.post(`${config.apiUrl}/register`, { body: this.state })
      .then(() => {
        this.setState({
          registerSuccess: true,
          registerError: null,
        });
      })
      .catch(({ err }) => {
        this.setState({
          registerError: err,
          password: '',
        });
      });
  }

  render() {
    const { registerError, registerSuccess, email, password } = this.state;

    return (
      <SettingsPageContainer>
        <Navbar title="META BNB" />
        <div className={styles.cardContainer}>
          <Card title="Sign Up">
            {registerSuccess && (
              <div className={styles.successContainer}>
                <div className={styles.successTitle}>Congratulations!</div>
                <div className={styles.successMsg}>
                  Now all that is left is to confirm your email address and enjoy the ride ;)
                </div>
              </div>
            )}
            {!registerSuccess && (
              <form className={styles.formContainer} onSubmit={this.submitNewUser}>
                <div className={styles.inputContainer}>
                  <Input
                    thickLines
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={this.oninputChange}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Input
                    thickLines
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.oninputChange}
                  />
                </div>
                {!!registerError && (
                  <div className={styles.inputContainer}>
                    <div className={styles.error}>{registerError}</div>
                  </div>
                )}
                <div className={styles.inputContainer}>
                  <Button kind="success" onClick={this.submitNewUser}>
                    Sign Up
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
        <div className={styles.signupHelper}>
        Already have an account? <Link className={styles.signupLink} to="/login">Log In</Link>
        </div>
      </SettingsPageContainer>
    );
  }
}
