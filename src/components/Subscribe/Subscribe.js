import React, { Component } from 'react';
import axios from '../../shared/axios';
import { Button, RawInput } from '../common';
import config from '../../../config';
import styles from './Subscribe.scss';

function validEmail(email) {
  // eslint-disable-next-line
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

const isSuccessfulStatusCode = code => code >= 200 && code < 400;

export default class Subscribe extends Component {
  state = {
    btnText: 'Subscribe',
    btnEnabled: true,
    email: '',
    hasError: false,
    hasSuccess: false,
  };

  setEmailValue = (e) => {
    this.setState({
      email: e.target.value,
      hasError: false,
      hasSuccess: false,
    });
  }

  subscribe = () => {
    const { email } = this.state;

    if (validEmail(email)) {
      axios.post(`${config.apiUrl}/subscribe`, {
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      }).then((response) => {
        if (!isSuccessfulStatusCode(response.status)) {
          this.setState({ hasError: true });
          return;
        }

        this.setState({
          hasSuccess: true,
          email: '',
        });
      });
    } else {
      this.setState({ hasError: true });
    }
  }

  render() {
    const {
      btnText,
      btnEnabled,
      hasError,
      hasSuccess,
      email,
    } = this.state;

    return (
      <div>
        <div className={styles.title}>
          Please subscribe to find out when you can use our platform to increase your airbnb income
        </div>
        <div className={styles.formContainer}>
          <div className={styles.formControl}>
            <RawInput
              value={email}
              placeholder="Type in your address"
              onKeyUp={this.setEmailValue}
            />
          </div>
          <div className={styles.formControl}>
            <Button kind="danger" disabled={!btnEnabled} onClick={this.subscribe}>
              {btnText}
            </Button>
          </div>
        </div>

        {hasError && (
          <div className={styles.error}>Please enter valid email</div>
        )}

        {hasSuccess && (
          <div className={styles.success}>Thank you for your interest</div>
        )}
      </div>
    );
  }
}
