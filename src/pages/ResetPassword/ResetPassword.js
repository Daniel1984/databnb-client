import { h } from 'preact';
import { Link } from 'preact-router/match';
import styles from './ResetPassword.scss';
import { Button, Card, SettingsPageContainer } from '../../components/common';
import LeftArrowIcon from '../../assets/icons/left-arrow.svg';

export default function Login() {
  return (
    <SettingsPageContainer title="META BNB">
      <div className={styles.cardContainer}>
        <Card title="Reset Password">
          <div class={styles.inputContainer}>
            <input class={styles.input} type="email" placeholder="Email Address" />
          </div>
          <div class={styles.inputContainer}>
            <Button className={styles.submitBtn}>Reset my password</Button>
          </div>
        </Card>
      </div>
    </SettingsPageContainer>
  );
}
