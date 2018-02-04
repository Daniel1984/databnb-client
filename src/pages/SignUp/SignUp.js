import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import styles from './SignUp.scss';
import { Input, Button, Card, SettingsPageContainer } from '../../components/common';
import fetch from '../../shared/fetch';
import LeftArrowIcon from '../../assets/icons/left-arrow.svg';
import config from '../../../config';

export default class Signup extends Component {
  state = {
    email: '',
    password: '',
    err: null,
    success: null,
  };

  oninputChange = (e) => {
    this.setState({
      [e.target.type]: e.target.value
    });
  }

  submitNewUser = (e) => {
    fetch(`${config.apiUrl}/register`, { method: 'POST', body: this.state })
      .then((res) => {
        this.setState({
          success: 'Thank you. Please verify your email now.',
          err: null,
        });
      })
      .catch(({ err }) => this.setState({ err }));
  }

  render() {
    const { err, success } = this.state;

    return (
      <SettingsPageContainer backTo="/" title="META BNB">
        <div className={styles.cardContainer}>
          <Card title="Sign Up">
            {!!success && (
              <div class={styles.success}>{success}</div>
            )}
            {!success && (
              <div class={styles.formContainer}>
                <div class={styles.inputContainer}>
                  <Input
                    thickLines
                    type="email"
                    placeholder="Email Address"
                    onKeyUp={this.oninputChange}
                  />
                </div>
                <div class={styles.inputContainer}>
                  <Input
                    thickLines
                    type="password"
                    placeholder="Password"
                    onKeyUp={this.oninputChange}
                  />
                </div>
                {!!err && (
                  <div class={styles.inputContainer}>
                    <div class={styles.error}>{err}</div>
                  </div>
                )}
                <div class={styles.inputContainer}>
                  <Button className={styles.submitBtn} onClick={this.submitNewUser}>
                    Sign Up
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
        <div class={styles.signupHelper}>
        Already have an account? <Link class={styles.signupLink} href="/login">Log In</Link>
        </div>
      </SettingsPageContainer>
    );
  }
}
