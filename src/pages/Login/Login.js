import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { route } from 'preact-router';
import styles from './Login.scss';
import { Input, Button, Card, SettingsPageContainer } from '../../components/common';
import Navbar from '../../components/Navbar/Navbar';
import fetch from '../../shared/fetch';
import config from '../../../config';

export default class Login extends Component {
  state = {
    email: this.props.email,
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
    fetch(`${config.apiUrl}/login`, { method: 'POST', body: this.state })
      .then(({ token }) => {
        sessionStorage.setItem('auth-token', token);
        route('/settings', true);
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
        <Navbar  backTo="/" title="META BNB" />
        <div className={styles.cardContainer}>
          <Card title="Login">
            <form class={styles.form} onSubmit={this.login}>
              <div class={styles.inputContainer}>
                <Input
                  thickLines
                  type="email"
                  value={email}
                  placeholder="Email Address"
                  onKeyUp={this.oninputChange}
                />
              </div>
              <div class={styles.inputContainer}>
                <Input
                  thickLines
                  type="password"
                  value={password}
                  placeholder="Password"
                  onKeyUp={this.oninputChange}
                />
              </div>
              {!!loginError && (
                <div class={styles.inputContainer}>
                  <div class={styles.error}>{loginError}</div>
                </div>
              )}
              <div class={styles.inputContainer}>
                <Button className={styles.submitBtn} onClick={this.login}>Log In</Button>
              </div>
            </form>
            <div class={styles.inputContainer}>
              <Link class={styles.forgotPassLink} href="/reset-password">Forgot password?</Link>
            </div>
          </Card>
        </div>
        <div class={styles.signupHelper}>
          Don't have an account? <Link class={styles.signupLink} href="/signup">Sign Up</Link>
        </div>
      </SettingsPageContainer>
    );
  }
}
