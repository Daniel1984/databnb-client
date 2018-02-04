import { h } from 'preact';
import { Link } from 'preact-router/match';
import styles from './ResetPassword.scss';
import { Input, Button, Card, SettingsPageContainer } from '../../components/common';
import LeftArrowIcon from '../../assets/icons/left-arrow.svg';

export default function Login() {
  return (
    <SettingsPageContainer backTo="/" title="META BNB">
      <div className={styles.cardContainer}>
        <Card title="Reset Password">
          <div class={styles.inputContainer}>
            <Input
              thickLines
              type="email"
              placeholder="Email Address"
            />
          </div>
          <div class={styles.inputContainer}>
            <Button className={styles.submitBtn}>Reset my password</Button>
          </div>
        </Card>
      </div>
    </SettingsPageContainer>
  );
}
