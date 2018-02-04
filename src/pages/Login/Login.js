import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import styles from './Login.scss';
import { Input, Button, Card, SettingsPageContainer } from '../../components/common';

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

  render() {
    const { email, password } = this.state;
    return (
      <SettingsPageContainer backTo="/" title="META BNB">
        <div className={styles.cardContainer}>
          <Card title="Login">
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
            <div class={styles.inputContainer}>
              <Button className={styles.submitBtn}>Log In</Button>
            </div>
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
