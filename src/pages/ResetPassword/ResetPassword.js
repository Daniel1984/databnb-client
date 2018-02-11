import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import styles from './ResetPassword.scss';
import { Input, Button, Card, SettingsPageContainer } from '../../components/common';
import fetch from '../../shared/fetch';
import config from '../../../config';
import Navbar from '../../components/Navbar/Navbar';

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
    fetch(`${config.apiUrl}/request-password-reset`, { method: 'POST', body: this.state })
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
        <Navbar  backTo="/" title="META BNB" />
        <div className={styles.cardContainer}>
          <Card title="Reset Password">
            {!resetSuccess && (
              <form class={styles.form} onSubmit={this.requestPasswordReset}>
                <div class={styles.inputContainer}>
                  <Input
                    thickLines
                    type="email"
                    value={email}
                    placeholder="Email Address"
                    onKeyUp={this.onEmailChange}
                  />
                </div>
                {!!resetError && (
                  <div class={styles.inputContainer}>
                    <div class={styles.error}>{resetError}</div>
                  </div>
                )}
                <div class={styles.inputContainer}>
                  <Button className={styles.submitBtn} onClick={this.requestPasswordReset}>
                    Reset my password
                  </Button>
                </div>
              </form>
            )}
            {resetSuccess && (
              <div class={styles.successContainer}>
                <div class={styles.successTitle}>Done!</div>
                <div class={styles.successMsg}>
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
