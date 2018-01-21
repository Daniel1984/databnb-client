import { h, Componnt, Component } from 'preact';
import styles from './Subscribe.scss';
import { Button, Input } from '../common';
import config from '../../../config';

function validEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

  subscribe = (e) => {
    const { email } = this.state;

    if (validEmail(email)) {
      fetch(`${config.apiUrl}/subscribe`, {
        method: 'POST',
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

  setEmailValue = (e) => {
    this.setState({
      email: e.target.value,
      hasError: false,
      hasSuccess: false,
    });
  }

  render() {
    const { btnText, btnEnabled, hasError, hasSuccess, email } = this.state;

    return (
      <div class={styles.root}>
        <div class={styles.title}>
          Please subscribe to find out when you can use our platform to increase your airbnb income
        </div>
        <div class={styles.formContainer}>
          <div class={styles.formControl}>
            <Input
              value={email}
              placeholder="Type in your address"
              onKeyUp={this.setEmailValue}
            />
          </div>
          <div class={styles.formControl}>
            <Button
              onClick={this.subscribe}
              disabled={!btnEnabled}
              btnText={btnText}
            />
          </div>
        </div>

        {hasError && (
          <div class={styles.error}>Please enter valid email</div>
        )}

        {hasSuccess && (
          <div class={styles.success}>Thank you for your interest</div>
        )}
      </div>
    );
  }
}