import { h, Component } from 'preact';
import { route } from 'preact-router';
import styles from './ChangePassword.scss';
import { Input, Button, Card, SettingsPageContainer } from '../../components/common';
import fetch from '../../shared/fetch';
import config from '../../../config';
import Navbar from '../../components/Navbar/Navbar';

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
    const { token } = this.props;
    fetch(`${config.apiUrl}/change-password`, { method: 'POST', body: { ...this.state, token } })
      .then(({ email }) => {
        route(`/login?email=${email}`, true);
      })
      .catch(({ err }) => {
        this.setState({ changePassError: err });
      });
  }

  render() {
    const { password, changePassError, email } = this.state;

    return (
      <SettingsPageContainer>
        <Navbar  backTo="/" title="META BNB" />
        <div className={styles.cardContainer}>
          <Card title="Change Password">
            <form class={styles.form} onSubmit={this.submitNewPassword}>
              <div class={styles.inputContainer}>
                <Input
                  thickLines
                  type="password"
                  value={password}
                  placeholder="New password"
                  onKeyUp={this.onPasswordChange}
                />
              </div>
              {!!changePassError && (
                <div class={styles.inputContainer}>
                  <div class={styles.error}>{changePassError}</div>
                </div>
              )}
              <div class={styles.inputContainer}>
                <Button className={styles.submitBtn} onClick={this.submitNewPassword}>
                  Change password
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </SettingsPageContainer>
    )
  }
}
