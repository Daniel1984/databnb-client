import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { parse } from 'qs';
import { Input, Button, Card, SettingsPageContainer } from '../../components/common';
import Navbar from '../../components/Navbar/Navbar';
import axios from '../../shared/axios';
import config from '../../../config';
import styles from './Login.scss';

export default class Login extends Component {
  state = {
    email: parse(this.props.location.search.substr(1)).email,
    password: '',
    loginError: null,
    loginSuccess: false,
  };

  oninputChange = (e) => {
    this.setState({
      [e.target.type]: e.target.value
    });
  }

  login = (e) => {
    e.preventDefault();
    axios.post(`${config.apiUrl}/login`, { body: this.state })
      .then(({ token }) => {
        sessionStorage.setItem('auth-token', token);
        this.props.history.push('/');
      })
      .catch(({ err }) => {
        this.setState({
          loginError: err,
          password: ''
        });
      });
  }

  render() {
    const { email, password, loginError } = this.state;

    return (
      <SettingsPageContainer>
        <Navbar title="META BNB" />
        <div className={styles.cardContainer}>
          <Card title="Login">
            <form className={styles.form} onSubmit={this.login}>
              <div className={styles.inputContainer}>
                <Input
                  thickLines
                  type="email"
                  value={email}
                  placeholder="Email Address"
                  onChange={this.oninputChange}
                />
              </div>
              <div className={styles.inputContainer}>
                <Input
                  thickLines
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={this.oninputChange}
                />
              </div>
              {!!loginError && (
                <div className={styles.inputContainer}>
                  <div className={styles.error}>{loginError}</div>
                </div>
              )}
              <div className={styles.inputContainer}>
                <Button kind="success" onClick={this.login}>Log In</Button>
              </div>
            </form>
            <div className={styles.inputContainer}>
              <Link className={styles.forgotPassLink} to="/reset-password">Forgot password?</Link>
            </div>
          </Card>
        </div>
        <div className={styles.signupHelper}>
          Don`t have an account? <Link className={styles.signupLink} to="/signup">Sign Up</Link>
        </div>
      </SettingsPageContainer>
    );
  }
}
