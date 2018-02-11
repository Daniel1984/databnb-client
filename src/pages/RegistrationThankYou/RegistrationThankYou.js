import { h } from 'preact';
import { Link } from 'preact-router/match';
import styles from './RegistrationThankYou.scss';
import { Card, SettingsPageContainer } from '../../components/common';
import Navbar from '../../components/Navbar/Navbar';

export default function RegistrationThankYou({ email }) {
  return (
    <SettingsPageContainer>
      <Navbar  backTo="/" title="META BNB" />
      <div className={styles.cardContainer}>
        <Card title="Thank you for registering with Metabnb!">
          <div class={styles.message}>
            We're more than happy that you have chosen our services and can't wait to get started increasing your income!
          </div>
          <Link class={styles.loginLink} href={`/login?email=${email}`}>Login?</Link>
        </Card>
      </div>
    </SettingsPageContainer>
  );
}
