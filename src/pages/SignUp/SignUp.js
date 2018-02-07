import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import styles from './SignUp.scss';
import { Input, Button, Card, SettingsPageContainer } from '../../components/common';
import fetch from '../../shared/fetch';
import config from '../../../config';

export default class Signup extends Component {
  state = {
    email: '',
    password: '',
    registerError: null,
    registerSuccess: false,
  };

  oninputChange = (e) => {
    this.setState({
      [e.target.type]: e.target.value
    });
  }

  submitNewUser = (e) => {
    e.preventDefault();
    fetch(`${config.apiUrl}/register`, { method: 'POST', body: this.state })
      .then(() => {
        this.setState({
          registerSuccess: true,
          registerError: null,
        });
      })
      .catch(({ err }) => {
        this.setState({
          registerError: err,
          email: '',
          password: ''
        });
      });
  }

  render() {
    const { registerError, registerSuccess, email, password } = this.state;

    return (
      <SettingsPageContainer backTo="/" title="META BNB">
        <div className={styles.cardContainer}>
          <Card title="Sign Up">
            {registerSuccess && (
              <div class={styles.successContainer}>
                <div class={styles.successTitle}>Congratulations!</div>
                <div class={styles.successMsg}>
                  Now all that is left is to confirm your email address and enjoy the ride ;)
                </div>
              </div>
            )}
            {!registerSuccess && (
              <form class={styles.formContainer} onSubmit={this.submitNewUser}>
                <div class={styles.inputContainer}>
                  <Input
                    thickLines
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onKeyUp={this.oninputChange}
                  />
                </div>
                <div class={styles.inputContainer}>
                  <Input
                    thickLines
                    type="password"
                    placeholder="Password"
                    value={password}
                    onKeyUp={this.oninputChange}
                  />
                </div>
                {!!registerError && (
                  <div class={styles.inputContainer}>
                    <div class={styles.error}>{registerError}</div>
                  </div>
                )}
                <div class={styles.inputContainer}>
                  <Button className={styles.submitBtn} onClick={this.submitNewUser}>
                    Sign Up
                  </Button>
                </div>
              </form>
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
