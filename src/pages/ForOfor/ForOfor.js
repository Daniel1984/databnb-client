import { h } from 'preact';
import { Link } from 'preact-router/match';
import styles from './ForOfor.scss';
import { Card, SettingsPageContainer } from '../../components/common';

export default function ForOfor() {
  return (
    <SettingsPageContainer backTo="/" title="PAGE NOT FOUND">
      <div className={styles.cardContainer}>
        <Card title="404 :(">
          <div class={styles.message}>
            Sorry, but the page you're trying to visit does not exist.
          </div>
          <Link class={styles.loginLink} href="/login">Login?</Link>
        </Card>
      </div>
    </SettingsPageContainer>
  );
}
